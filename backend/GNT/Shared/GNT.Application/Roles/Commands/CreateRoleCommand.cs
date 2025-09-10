using GNT.Domain.Models;
using GNT.Shared.Errors;
using GNT.Shared.Dtos.Roles;

namespace GCSS.Administration.Application.Roles.Commands
{
    public class CreateRoleCommand : IRequest<Guid>
    {
        public CreateRoleCommand(CreateRoleDto model)
        {
            Model = model;
        }

        internal CreateRoleDto Model { get; set; }
    }

    internal class CreateRoleCommandHandler : RequestHandler<CreateRoleCommand, Guid>
    {
        public CreateRoleCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async override Task<Guid> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            var alreadyExists = appDbContext.Role.Any(d => d.Name.ToLower() == request.Model.Name.ToLower());

            if (alreadyExists)
            {
                throw new BusinessException(FailureCode.DuplicateRoleName);
            }

            var role = request.Model.CreateEntity();

            appDbContext.Role.Add(role);
            await appDbContext.SaveChangesAsync(cancellationToken);

            return role.Id;
        }
    }

    internal class CreateRoleCommandValidator : AbstractValidator<CreateRoleCommand>
    {
        internal CreateRoleCommandValidator()
        {
            RuleFor(d => d.Model.Name)
                .NotNull()
                .NotEmpty()
                .MaximumLength(30);

            RuleFor(d => d.Model.Description)
                .NotNull()
                .NotEmpty()
                .MaximumLength(200);
        }
    }
}