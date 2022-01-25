function links(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .links();
}

function announcements(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .announcements();
}

function pics(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .pics();
}


module.exports = {
  links,
  announcements,
  pics
};