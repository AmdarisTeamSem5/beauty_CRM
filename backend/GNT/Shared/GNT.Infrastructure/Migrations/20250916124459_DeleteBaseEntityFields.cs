using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GNT.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DeleteBaseEntityFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Role_User_CreatedById",
                table: "Role");

            migrationBuilder.DropForeignKey(
                name: "FK_Role_User_LastUpdatedById",
                table: "Role");

            migrationBuilder.DropForeignKey(
                name: "FK_Salon_User_CreatedById",
                table: "Salon");

            migrationBuilder.DropForeignKey(
                name: "FK_Salon_User_LastUpdatedById",
                table: "Salon");

            migrationBuilder.DropForeignKey(
                name: "FK_SalonService_User_CreatedById",
                table: "SalonService");

            migrationBuilder.DropForeignKey(
                name: "FK_SalonService_User_LastUpdatedById",
                table: "SalonService");

            migrationBuilder.DropForeignKey(
                name: "FK_User_User_CreatedById",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_User_LastUpdatedById",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_CreatedById",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_LastUpdatedById",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_SalonService_CreatedById",
                table: "SalonService");

            migrationBuilder.DropIndex(
                name: "IX_SalonService_LastUpdatedById",
                table: "SalonService");

            migrationBuilder.DropIndex(
                name: "IX_Salon_CreatedById",
                table: "Salon");

            migrationBuilder.DropIndex(
                name: "IX_Salon_LastUpdatedById",
                table: "Salon");

            migrationBuilder.DropIndex(
                name: "IX_Role_CreatedById",
                table: "Role");

            migrationBuilder.DropIndex(
                name: "IX_Role_LastUpdatedById",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "User");

            migrationBuilder.DropColumn(
                name: "LastUpdatedAt",
                table: "User");

            migrationBuilder.DropColumn(
                name: "LastUpdatedById",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "SalonService");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "SalonService");

            migrationBuilder.DropColumn(
                name: "LastUpdatedAt",
                table: "SalonService");

            migrationBuilder.DropColumn(
                name: "LastUpdatedById",
                table: "SalonService");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Salon");

            migrationBuilder.DropColumn(
                name: "LastUpdatedAt",
                table: "Salon");

            migrationBuilder.DropColumn(
                name: "LastUpdatedById",
                table: "Salon");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "LastUpdatedAt",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "LastUpdatedById",
                table: "Role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "User",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedAt",
                table: "User",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "LastUpdatedById",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "SalonService",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "SalonService",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedAt",
                table: "SalonService",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "LastUpdatedById",
                table: "SalonService",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "Salon",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedAt",
                table: "Salon",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "LastUpdatedById",
                table: "Salon",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Role",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "Role",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedAt",
                table: "Role",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "LastUpdatedById",
                table: "Role",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_CreatedById",
                table: "User",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_User_LastUpdatedById",
                table: "User",
                column: "LastUpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_SalonService_CreatedById",
                table: "SalonService",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_SalonService_LastUpdatedById",
                table: "SalonService",
                column: "LastUpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Salon_CreatedById",
                table: "Salon",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Salon_LastUpdatedById",
                table: "Salon",
                column: "LastUpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Role_CreatedById",
                table: "Role",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Role_LastUpdatedById",
                table: "Role",
                column: "LastUpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Role_User_CreatedById",
                table: "Role",
                column: "CreatedById",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Role_User_LastUpdatedById",
                table: "Role",
                column: "LastUpdatedById",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Salon_User_CreatedById",
                table: "Salon",
                column: "CreatedById",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Salon_User_LastUpdatedById",
                table: "Salon",
                column: "LastUpdatedById",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SalonService_User_CreatedById",
                table: "SalonService",
                column: "CreatedById",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SalonService_User_LastUpdatedById",
                table: "SalonService",
                column: "LastUpdatedById",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_User_CreatedById",
                table: "User",
                column: "CreatedById",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_User_LastUpdatedById",
                table: "User",
                column: "LastUpdatedById",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
