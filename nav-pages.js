// One subgroup level keeps navigation and its build consumers in agreement.
function leaves(items) {
  return items.flatMap(item => {
    if (!item.children) return [item];
    if (item.children.some(child => child.children)) throw new Error('Navigation supports one subgroup level');
    return item.children;
  });
}
function allPages(nav) { return nav.groups.flatMap(group => leaves(group.pages)); }
function sections(nav) {
  return nav.groups.flatMap(group => [
    { title: group.group, path: group.path, pages: group.pages },
    ...group.pages.filter(item => item.children).map(item => ({
      title: item.title, path: item.path, pages: item.children
    }))
  ]);
}
module.exports = { leaves, allPages, sections };
