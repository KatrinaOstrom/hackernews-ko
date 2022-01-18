async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { tag: { contains: args.filter } },
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const users = await context.prisma.user.findMany();
  const announcements = await context.prisma.announcement.findMany();

  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    users,
    announcements,
    count
  };
}

module.exports = {
  feed
};