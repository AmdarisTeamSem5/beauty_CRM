using GNT.Shared.Errors;
using GNT.Shared.Dtos.Roles;

namespace GCSS.Administration.Application.Roles.Commands
{
    public class EditRoleCommand : IRequest<Unit>
    {
        public EditRoleCommand(Guid id, EditRoleDto model)
        {
            Id = id;
            Model = model;
        }

        internal Guid Id { get; set; }
        internal EditRoleDto Model { get; set; }
    }

    internal class EditRoleCommandHandler : RequestHandler<EditRoleCommand, Unit>
    {
        public EditRoleCommandHandler(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        public async override Task<Unit> Handle(EditRoleCommand request, CancellationToken cancellationToken)
        {
            var roleToEdit = appDbContext.Role
                .Where(d => d.Id == request.Id)
                .FirstOrDefault();

            if(roleToEdit == null)
            {
                throw new BusinessException(FailureCode.InvalidRoleId);
            }

            if (!string.IsNullOrEmpty(request.Model.Name))
            {
                var alreadyExists = appDbContext.Role.Any(d => d.Name.ToLower() == request.Model.Name.ToLower());

                if (alreadyExists)
                {
                    throw new BusinessException(FailureCode.DuplicateRoleName);
                }

                roleToEdit.Name = request.Model.Name;
            }

            if (!string.IsNullOrEmpty(request.Model.Description))
            {
                roleToEdit.Description = request.Model.Description;
            }

            await appDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }

    internal class EditRoleCommandValidator : AbstractValidator<EditRoleCommand>
    {
        public EditRoleCommandValidator()
        {
            RuleFor(d => d.Model.Name)
                .MaximumLength(30);

            RuleFor(d => d.Model.Description)
                .MaximumLength(200);
        }
    }
}
