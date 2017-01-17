var Discord = require('discord.io');
var bot = new Discord.Client({
    token: "MjcwNzE2NjI2NDY5NTE5Mzcy.C178BA.-r2Tpn_x9ULMt7cEG-cTgd9g6OY",
    autorun: true,

});


bot.on('ready', function() {
    console.log(bot.username + " - (" + bot.id + ")");
    // console.log(bot.servers);
    // for (var server in bot.servers){
    // 	console.log(server.roles)
    // 	for (var role in bot.servers[server].roles){
    // 		console.log(bot.servers[server].roles[role].name);
    // 	}
    // }
    
});


//Role command
bot.on('message', function(user, userID, channelID, message, event) {
	var cmd = message.split(" ");
	
	// console.log("---------------------------");
	// console.log(Discord);
	// console.log(bot.servers[server_id].roles)
	var serverID = bot.channels[channelID].guild_id;
	var selectedRole = searchRoles(bot.servers[serverID].roles, vRole);

    if (cmd[0] === "$role" && cmd.length === 1) {
    	bot.sendMessage({
            to: channelID,
            message: "Please select a role:\nDruid\nDeath Knight\nDemon Hunter\nHunter\nMage\nMonk\nPaladin\nPriest\nShaman\nRogue\nWarlock\nWarrior"
        });
    } else if (cmd[0] === "$role" && cmd[1] == "remove" && cmd.length > 2){
    	var vRole = validateRole(cmd[2].toLowerCase());
    	var selectedRole = searchRoles(bot.servers[serverID].roles, vRole);

    	console.log("Removing role: " + vRole + " from " + user);
    	bot.removeFromRole({"serverID": serverID, "userID": userID, "roleID": selectedRole.id});
    	
    	bot.sendMessage({
            to: channelID,
            message: "Removing role: "+ vRole + " from " + selectedRole.name
    	});

    } else if (cmd[0] === "$role" && cmd.length > 1) {
    	var vRole = validateRole(cmd[1].toLowerCase());
       	if (vRole) {
			var selectedRole = searchRoles(bot.servers[serverID].roles, vRole);
			if (selectedRole !== undefined){
				console.log("Adding role: " + vRole + " to " + user);
				bot.addToRole({"serverID": serverID, "userID": userID, "roleID": selectedRole.id});
				bot.sendMessage({
		            to: channelID,
		            message: "Adding role: "+ vRole + " to " + selectedRole.name
	        	});
			}
    	} else {
    		console.log(user + " input invalid role: " + vRole);
    		bot.sendMessage({
		        to: channelID,
		        message: "Invalid role."
	        });
    	}        
    }
    
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "$two") {
        bot.sendMessage({
            to: channelID,
            message: "four"
        });
    }
});


bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "$ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }
});

// bot.on('message', function(user, userID, channelID, message, event) {
//     if (message === "$dc") {
//         bot.disconnect();
//     }
// });

function searchRoles(serverRoles, inputRole) {
	for (var roleID in serverRoles){
    	if (serverRoles[roleID].name === inputRole){
    		return serverRoles[roleID];
    	}
    }
}



function validateRole(iRole) {
	var roleList = ["druid", "death knight", "demon hunter", "hunter", "mage", "monk", "paladin", "priest", "shaman", "rogue", "warlock", "warrior"];

	switch(true) {
		case /dk|death/.test(iRole):
			iRole = "death knight";
			break;
		case /dh|demon/.test(iRole):
			iRole = "demon hunter";
			break;
	}

	for (var vRole of roleList) {
		if (vRole == iRole) {
			return toTitleCase(vRole);
		}
	} 
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}