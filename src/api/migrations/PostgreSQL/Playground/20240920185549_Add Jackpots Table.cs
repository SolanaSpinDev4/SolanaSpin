using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playground
{
    /// <inheritdoc />
    public partial class AddJackpotsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Jackpots",
                schema: "playground",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false, defaultValue: ""),
                    Slug = table.Column<string>(type: "text", nullable: false, defaultValue: ""),
                    IsEnabled = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CurrentAmount = table.Column<decimal>(type: "numeric", nullable: false, defaultValue: 0m),
                    LimitAmount = table.Column<decimal>(type: "numeric", nullable: false, defaultValue: 0m),
                    CollectPercentage = table.Column<decimal>(type: "numeric", nullable: false, defaultValue: 0m),
                    MinimumPlayAmountToWin = table.Column<decimal>(type: "numeric", nullable: true),
                    MaximumPlayAmountToWin = table.Column<decimal>(type: "numeric", nullable: true),
                    TenantId = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModified = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    LastModifiedBy = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jackpots", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Jackpots_Slug",
                schema: "playground",
                table: "Jackpots",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Jackpots",
                schema: "playground");
        }
    }
}
