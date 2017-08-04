/**
 * @file translate command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const string = require('../../handlers/languageHandler');
const translate = require('google-translate-api');

exports.run = async (Bastion, message, args) => {
  if (args.length < 2) {
    /**
     * The command was ran with invalid parameters.
     * @fires commandUsage
     */
    return Bastion.emit('commandUsage', message, this.help);
  }

  try {
    let result = await translate(args.slice(1).join(' '), { to: args[0] });

    message.channel.send({
      embed: {
        color: Bastion.colors.blue,
        description: result.text,
        footer: {
          text: `Powered by Google | Translation from ${result.from.language.iso.toUpperCase()} to ${args[0].toUpperCase()}`
        }
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
  catch (e) {
    if (e.stack.includes('not supported')) {
      /**
      * Error condition is encountered.
      * @fires error
      */
      return Bastion.emit('error', string('invalidInput', 'errors'), string('invalidInput', 'errorMessage', 'language code'), message.channel);
    }
    Bastion.log.error(e);
  }
};

exports.config = {
  aliases: [ 'trans' ],
  enabled: true
};

exports.help = {
  name: 'translate',
  description: string('translate', 'commandDescription'),
  botPermission: '',
  userPermission: '',
  usage: 'translate <language_code> <text>',
  example: [ 'translate EN Je suis génial!' ]
};
