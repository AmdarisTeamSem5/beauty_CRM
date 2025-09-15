using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GNT.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class and_services : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SalonService",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DurationMinutes",
                table: "SalonService",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PriceMDL",
                table: "SalonService",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "SalonId",
                table: "SalonService",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SpecialistId",
                table: "SalonService",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "SalonService");

            migrationBuilder.DropColumn(
                name: "DurationMinutes",
                table: "SalonService");

            migrationBuilder.DropColumn(
                name: "PriceMDL",
                table: "SalonService");

            migrationBuilder.DropColumn(
                name: "SalonId",
                table: "SalonService");

            migrationBuilder.DropColumn(
                name: "SpecialistId",
                table: "SalonService");
        }
    }
}
