import type { Action } from 'svelte/action';

/** Tracks the cursor over a node and exposes it as --mx / --my for the spotlight glow. */
export const spotlight: Action<HTMLElement> = (node) => {
	function move(event: PointerEvent) {
		const rect = node.getBoundingClientRect();
		node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
		node.style.setProperty('--my', `${event.clientY - rect.top}px`);
	}
	node.addEventListener('pointermove', move);
	return { destroy: () => node.removeEventListener('pointermove', move) };
};
