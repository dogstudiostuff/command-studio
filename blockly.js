// Create the definition.
const definitions = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: 'pc_restart',
    message0: 'Restart PC',
    previousStatement: null,
    nextStatement: null,
    colour: "#0051ff",
    tooltip: "Restarts the PC"
  },
  {
    type: 'pc_shutdown',
    message0: 'Shutdown PC',
    previousStatement: null,
    nextStatement: null,
    colour: "#0051ff",
    tooltip: "Shuts down the PC"
  },
  {
    type: 'pc_shutdown_force',
    message0: 'Shutdown PC (Forced)',
    previousStatement: null,
    nextStatement: null,
    colour: "#0051ff",
    tooltip: "Forcibly shuts down the PC (without closing apps)"
  },
  {
    type: 'pc_restart_force',
    message0: 'Restart PC (Forced)',
    previousStatement: null,
    nextStatement: null,
    colour: "#0051ff",
    tooltip: "Forcibly restarts the PC (without closing apps)"
  },
  {
    type: 'pc_advanced',
    message0: 'Go to advanced options',
    previousStatement: null,
    nextStatement: null,
    colour: "#0051ff",
    tooltip: "Restarts the PC into Windows advanced options"
  },
  {
    type: 'pc_apps_run',
    message0: 'Start program/command %1',
    "args0": [
        {
            "type": "field_input",
            "name": "APP",
            "text": "cmd",
            "spellcheck": false
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#00aeff",
    tooltip: "Runs an app via the Run dialog"
  },
  {
    type: 'pc_apps_admin',
    message0: 'Start program/command %1 as administrator',
    "args0": [
        {
            "type": "field_input",
            "name": "APP",
            "text": "cmd",
            "spellcheck": false
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#00aeff",
    tooltip: "Runs an app via the Run dialog as administrator"
  },
  {
    type: 'pc_keyboard_type',
    message0: 'Type %1',
    "args0": [
        {
            "type": "field_input",
            "name": "TEXT",
            "text": "Hello!",
            "spellcheck": false
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#168100",
    tooltip: "Types a message on the keyboard"
  },
  {
    type: 'pc_keyboard_enter',
    message0: 'Press enter',
    previousStatement: null,
    nextStatement: null,
    colour: "#168100",
    tooltip: "Presses enter (faster than Press key)"
  },
  {
    type: 'pc_keyboard_key',
    message0: 'Press key %1',
    "args0": [
        {
            "type": "field_input",
            "name": "KEY",
            "text": "ctrl",
            "spellcheck": false
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#168100",
    tooltip: "Presses a specific key"
  },
  {
    type: 'pc_time_wait',
    message0: 'Wait %1 seconds',
    "args0": [
        {
            "type": "field_number",
            "name": "TIME",
            "value": 1
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#ff8800",
    tooltip: "Waits a number of seconds before continuing the script"
  }
]);

Blockly.common.defineBlocks(definitions);

Blockly.JavaScript.forBlock['pc_restart'] = function(block, generator) {
  return `!combo win+r!type shutdown /r /t 0!enter`;
}

Blockly.JavaScript.forBlock['pc_shutdown'] = function(block, generator) {
  return `!combo win+r!type shutdown /t 0!enter`;
}

Blockly.JavaScript.forBlock['pc_shutdown_force'] = function(block, generator) {
  return `!combo win+r!type shutdown /f /t 0!enter`;
}

Blockly.JavaScript.forBlock['pc_restart_force'] = function(block, generator) {
  return `!combo win+r!type shutdown /r /f /t 0!enter`;
}

Blockly.JavaScript.forBlock['pc_advanced'] = function(block, generator) {
  return `!combo win+r!type cmd!combo ctrl+shift+enter!wait 1!key left!key enter!wait 1!type shutdown /r /o /f /t 0!enter`;
}

Blockly.JavaScript.forBlock['pc_apps_run'] = function(block, generator) {
  const app = block.getFieldValue('APP')
  return `!combo win+r!type ${app}!enter`;
}

Blockly.JavaScript.forBlock['pc_apps_admin'] = function(block, generator) {
  const app = block.getFieldValue('APP')
  return `!combo win+r!type ${app}!combo ctrl+shift+enter!wait 2!key left!key enter`;
}

Blockly.JavaScript.forBlock['pc_keyboard_type'] = function(block, generator) {
  const text = block.getFieldValue('TEXT')
  return `!type ${text}`;
}

Blockly.JavaScript.forBlock['pc_keyboard_enter'] = function(block, generator) {
  return `!enter`;
}

Blockly.JavaScript.forBlock['pc_keyboard_key'] = function(block, generator) {
  const key = block.getFieldValue('KEY')
  return `!key ${key}`;
}

Blockly.JavaScript.forBlock['pc_time_wait'] = function(block, generator) {
  const time = block.getFieldValue('TIME')
  return `!wait ${time}`;
}

const workspace = Blockly.inject('blocklyWorkspace', {
    grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: false
    },
    renderer: "zelos",
    toolbox: document.getElementById('toolbox'),
    zoom:{
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true
    }
});

document.getElementById("generateCommand").addEventListener("click", () => {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    navigator.clipboard.writeText(code)
    if (code.length > 200) {
      alert("Copied with warning: This command will not work on YouTube.")
    } else {
      alert("Copied!")
    }
})