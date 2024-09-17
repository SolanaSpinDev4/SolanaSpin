using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playground
{
    /// <inheritdoc />
    public partial class AddPlaygroundSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "playground");

            migrationBuilder.CreateTable(
                name: "Dice",
                schema: "playground",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: ""),
                    Slug = table.Column<string>(type: "nvarchar(450)", nullable: false, defaultValue: ""),
                    IsPubliclyPlayable = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    MinimumPlayAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MaximumPlayAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Faces = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TenantId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dice", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dice_Slug",
                schema: "playground",
                table: "Dice",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dice",
                schema: "playground");
        }
    }
}
