function postedBy(parent, args, context) {
    return context.prisma.announcement
      .findUnique({ where: { id: parent.id } })
      .postedBy();
  }

  module.exports = {
    postedBy
  };
