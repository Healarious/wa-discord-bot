var JsonDB = require('node-json-db');
var botFuncs = require('../bot.js')
var prefix = new JsonDB("./data/prefix", true, true);

module.exports = function (args, user, userID, channelID, bot){
	var serverID = bot.channels[channelID].guild_id; // grab server id

	var args = args.split(" ");
	var newPrefix = args[0];
	if (newPrefix.trim() == ""){
		botFuncs.sendMsg(channelID, "Not a good prefix");
		botFuncs.log("Not a good prefix")
	}
	else if (canManageChannels(bot, userID, serverID)) {
		botFuncs.sendMsg(channelID, "Changed the prefix to: " + newPrefix);
		botFuncs.log(user+ " prefix to " + newPrefix);
		prefix.push("/"+serverID, newPrefix)
	}
	else {
		botFuncs.sendMsg(channelID, "You do not have permissons to change the prefix.");
		botFuncs.log(user + " attempted to change the prefix");
	}
}

//https://github.com/izy521/discord.io/blob/master/docs/permissions.md
function canManageChannels(client, userID, serverID) {
    var server = client.servers[serverID];
    var member = server.members[userID];
    return member.roles.some( roleID => server.roles[roleID].GENERAL_MANAGE_CHANNELS);
}