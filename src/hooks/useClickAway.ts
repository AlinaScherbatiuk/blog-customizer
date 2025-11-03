import { useEffect } from 'react';

export function useClickAway<T extends HTMLElement>(
	elementRef: React.RefObject<T>,
	callback: () => void,
	isActive = true
) {
	useEffect(() => {
		if (!isActive) return;
		const mouseDownListener = (mouseEvent: MouseEvent) => {
			const refElement = elementRef.current;
			if (!refElement) return;
			if (!refElement.contains(mouseEvent.target as Node)) callback();
		};
		document.addEventListener('mousedown', mouseDownListener);
		return () => document.removeEventListener('mousedown', mouseDownListener);
	}, [elementRef, callback, isActive]);
}

export default useClickAway;
