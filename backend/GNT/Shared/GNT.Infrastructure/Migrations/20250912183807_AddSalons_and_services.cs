using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GNT.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSalons_and_services : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Salons",
                newName: "name");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "Salons",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Salons",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Salons",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ownerId",
                table: "Salons",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "phone",
                table: "Salons",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "region",
                table: "Salons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SalonService",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastUpdatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastUpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalonService", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalonService_User_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SalonService_User_LastUpdatedById",
                        column: x => x.LastUpdatedById,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SalonService_CreatedById",
                table: "SalonService",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_SalonService_LastUpdatedById",
                table: "SalonService",
                column: "LastUpdatedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalonService");

            migrationBuilder.DropColumn(
                name: "address",
                table: "Salons");

            migrationBuilder.DropColumn(
                name: "description",
                table: "Salons");

            migrationBuilder.DropColumn(
                name: "email",
                table: "Salons");

            migrationBuilder.DropColumn(
                name: "ownerId",
                table: "Salons");

            migrationBuilder.DropColumn(
                name: "phone",
                table: "Salons");

            migrationBuilder.DropColumn(
                name: "region",
                table: "Salons");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Salons",
                newName: "Name");
        }
    }
}
