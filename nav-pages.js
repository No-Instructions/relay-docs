// One subgroup level keeps navigation and its build consumers in agreement.
function leaves(items) {
  return items.flatMap(item => {
    if (!item.children) return [item];
    if (item.children.some(child => child.children)) throw new Error('Navigation supports one subgroup level');
    return item.children;
  });
}
function allPages(nav) { return nav.groups.flatMap(group => leaves(group.pages)); }
module.exports = { leaves, allPages };
