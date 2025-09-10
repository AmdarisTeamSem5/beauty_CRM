namespace GCSS.Administration.Application.Roles.Commands
{
    public class DeleteRoleCommand : IRequest<Unit>
    {
        public DeleteRoleCommand(Guid roleId)
        {
            RoleId = roleId;
        }

        internal Guid RoleId { get; set; }
    }

    internal class DeleteRoleCommandHandler : RequestHandler<DeleteRoleCommand, Unit>
    {
        public DeleteRoleCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async override Task<Unit> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
        {
            var role = appDbContext.Role.FirstOrDefault(d => d.Id == request.RoleId);

            appDbContext.Role.Remove(role);
            await appDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
