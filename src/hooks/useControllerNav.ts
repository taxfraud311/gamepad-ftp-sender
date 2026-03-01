import { useEffect, useCallback, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";
type ButtonAction = "a" | "b" | "x" | "y" | "lb" | "rb" | "start" | "select";

interface UseControllerNavOptions {
  onNavigate?: (direction: Direction) => void;
  onButton?: (button: ButtonAction) => void;
  enabled?: boolean;
}

// Maps keyboard keys to controller actions for testing without a gamepad
const KEY_MAP: Record<string, Direction | ButtonAction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Enter: "a",
  Escape: "b",
  KeyX: "x",
  KeyY: "y",
  KeyQ: "lb",
  KeyE: "rb",
};

// Standard gamepad button indices
const GAMEPAD_BUTTONS: Record<number, ButtonAction> = {
  0: "a",   // A / Cross
  1: "b",   // B / Circle
  2: "x",   // X / Square
  3: "y",   // Y / Triangle
  4: "lb",  // LB / L1
  5: "rb",  // RB / R1
  8: "select",
  9: "start",
};

export function useControllerNav({ onNavigate, onButton, enabled = true }: UseControllerNavOptions) {
  const prevButtonsRef = useRef<Record<number, boolean>>({});
  const prevAxesRef = useRef<Record<number, number>>({});
  const rafRef = useRef<number>();

  // Keyboard handler
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      const mapped = KEY_MAP[e.code] || KEY_MAP[e.key];
      if (!mapped) return;
      e.preventDefault();
      if (["up", "down", "left", "right"].includes(mapped)) {
        onNavigate?.(mapped as Direction);
      } else {
        onButton?.(mapped as ButtonAction);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNavigate, onButton, enabled]);

  // Gamepad polling
  const pollGamepad = useCallback(() => {
    if (!enabled) return;
    const gamepads = navigator.getGamepads();
    const gp = gamepads[0];
    if (!gp) {
      rafRef.current = requestAnimationFrame(pollGamepad);
      return;
    }

    // Check buttons
    gp.buttons.forEach((btn, i) => {
      const wasPressed = prevButtonsRef.current[i];
      if (btn.pressed && !wasPressed) {
        const action = GAMEPAD_BUTTONS[i];
        if (action) onButton?.(action);
        // D-pad
        if (i === 12) onNavigate?.("up");
        if (i === 13) onNavigate?.("down");
        if (i === 14) onNavigate?.("left");
        if (i === 15) onNavigate?.("right");
      }
      prevButtonsRef.current[i] = btn.pressed;
    });

    // Left stick
    const THRESHOLD = 0.5;
    const lx = gp.axes[0] ?? 0;
    const ly = gp.axes[1] ?? 0;
    const plx = prevAxesRef.current[0] ?? 0;
    const ply = prevAxesRef.current[1] ?? 0;

    if (lx > THRESHOLD && plx <= THRESHOLD) onNavigate?.("right");
    if (lx < -THRESHOLD && plx >= -THRESHOLD) onNavigate?.("left");
    if (ly > THRESHOLD && ply <= THRESHOLD) onNavigate?.("down");
    if (ly < -THRESHOLD && ply >= -THRESHOLD) onNavigate?.("up");

    prevAxesRef.current[0] = lx;
    prevAxesRef.current[1] = ly;

    rafRef.current = requestAnimationFrame(pollGamepad);
  }, [onNavigate, onButton, enabled]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(pollGamepad);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pollGamepad]);
}
