import { getExplicitRole } from '../commons/aria';
import { querySelectorAll } from '../core/utils';

function ariaFormFieldNameMatches(node, virtualNode) {
	/**
	 * Note:
	 * This rule filters elements with 'role=*' attribute via 'selector'
	 * see relevant rule spec for details of 'role(s)' being filtered.
	 */
	const nodeName = node.nodeName.toUpperCase();
	const role = getExplicitRole(node);

	/**
	 * Ignore elements from rule -> 'area-alt'
	 */
	if (nodeName === 'AREA' && !!node.getAttribute('href')) {
		return false;
	}

	/**
	 * Ignore elements from rule -> 'label'
	 */
	if (['INPUT', 'SELECT', 'TEXTAREA'].includes(nodeName)) {
		return false;
	}

	/**
	 * Ignore elements from rule -> 'image-alt'
	 */
	if (nodeName === 'IMG' || (role === 'img' && nodeName !== 'SVG')) {
		return false;
	}

	/**
	 * Ignore elements from rule -> 'button-name'
	 */
	if (nodeName === 'BUTTON' || role === 'button') {
		return false;
	}

	/**
	 * Ignore combobox elements if they have a child input
	 * (ARIA 1.1 pattern)
	 */
	if (
		role === 'combobox' &&
		querySelectorAll(virtualNode, 'input:not([type="hidden"])').length
	) {
		return false;
	}

	return true;
}

export default ariaFormFieldNameMatches;
