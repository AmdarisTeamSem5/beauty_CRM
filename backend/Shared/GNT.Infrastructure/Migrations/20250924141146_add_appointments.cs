using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GNT.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class add_appointments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Appointment_ClientId",
                table: "Appointment",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointment_User_ClientId",
                table: "Appointment",
                column: "ClientId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointment_User_ClientId",
                table: "Appointment");

            migrationBuilder.DropIndex(
                name: "IX_Appointment_ClientId",
                table: "Appointment");
        }
    }
}
