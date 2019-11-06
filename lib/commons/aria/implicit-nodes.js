import lookupTable from './lookup-table.js';
import { clone } from '../../core/utils/index.js';

/**
 * Get a list of CSS selectors of nodes that have an implicit role
 * @method implicitNodes
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of CSS selectors or `null` if there are none
 */
function implicitNodes(role) {
	'use strict';

	var implicit = null,
		roles = lookupTable.role[role];

	if (roles && roles.implicit) {
		implicit = clone(roles.implicit);
	}
	return implicit;
}

export default implicitNodes;
