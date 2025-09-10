using GNT.Dtos.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace GNT.Domain.Models
{
    public class UserSecurityCode
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Code { get; set; }
        public SecurityCodeTypes Type { get; set; }
        public int FailedAttempts { get; set; }
        public bool SuccessfullyUsed { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }

        public virtual User User { get; set; }
    }

    public class UserSecurityCodeConfiguraiton : IEntityTypeConfiguration<UserSecurityCode>
    {
        public void Configure(EntityTypeBuilder<UserSecurityCode> entity)
        {
            entity.HasOne(d=>d.User)
                .WithMany(d=>d.UserSecurityCodes)
                .HasForeignKey(d=>d.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(d => d.CreatedAt);
        }
    }
}
