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

  const users = await context.prisma.user.findMany({ where });

  const announcements = await context.prisma.announcement.findMany({ where });
  const pics = await context.prisma.pic.findMany({ where });

  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    users,
    announcements,
    count, 
    pics
  };
}
module.exports = {
  feed
};