// One subgroup level keeps navigation and its build consumers in agreement.
function leaves(items) {
  return items.flatMap(item => {
    if (!item.children) return [item];
    if (item.children.some(child => child.children)) throw new Error('Navigation supports one subgroup level');
    return item.children;
  });
}
function allPages(nav) { return nav.groups.flatMap(group => leaves(group.pages)); }
// Top-level groups render as hubs; subgroups render as guides, numbered
// when their pages are steps to follow in order.
function sections(nav) {
  return nav.groups.flatMap(group => [
    { kind: 'hub', title: group.group, path: group.path, pages: group.pages },
    ...group.pages.filter(item => item.children).map(item => ({
      kind: 'guide', title: item.title, path: item.path, pages: item.children,
      outcome: item.outcome, paths: item.paths, video: item.video, ordered: Boolean(item.ordered)
    }))
  ]);
}
module.exports = { leaves, allPages, sections };
