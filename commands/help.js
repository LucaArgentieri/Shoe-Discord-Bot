const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('This command shows all availables commands.'),

    async execute(interaction) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#E3655B')
                    .setTitle('Help')
                    .addFields(
                        {
                            name: "$help",
                            value: `For information on generic resell prices or based on the desired number.`,
                        },
                        {
                            name: "$retail + shoe name",
                            value: `To get information about a shoe at retail.`,
                        },
                        {
                            name: "$nextDrop",
                            value: `To stay updated on upcoming releases.`,
                        },
                        {
                            name: "$todayDrop",
                            value: `To stay updated on the releases of the day.`,
                        },
                        {
                            name: "$monthDrop",
                            value: `To stay updated on the releases of the current month.`,
                        },
                        {
                            name: "$infoShoesNumber + shoe name + shoes number",
                            value: `To get information about a shoe with number.`,
                        },
                        {
                            name: "$mostPopular",
                            value: `To see the most popular scapre in the last three months.`,
                        }
                    )
            ],
            ephemeral: true
        });
    },
};