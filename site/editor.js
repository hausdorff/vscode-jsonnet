require.config({paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

require(['vs/editor/editor.main'], function() {
  function jsonnetCompletionProvider(monaco) {
    return {
      triggerCharacters: ['.'],
      provideCompletionItems: function(model, position) {
        var lines = model.getLinesContent();
        return onComplete(lines, position)
        // return [{
        //   label: "foo",
        //   kind: monaco.languages.CompletionItemKind.Property,
        //   detail: "bar",
        //   documentation: "docs"
        // }];
      }
    }
  }

  // register a completion item provider for xml language
  monaco.languages.register({
    id: 'jsonnet',
    extensions: [ '.jsonnet', '.libsonnet' ],
    aliases: [ 'Jsonnet' ],
  });
  monaco.languages.registerCompletionItemProvider('jsonnet', jsonnetCompletionProvider(monaco));

  var editor = monaco.editor.create(document.getElementById('container'), {
    theme: 'vs-dark', // dark theme
    language: 'jsonnet',
    suggestOnTriggerCharacters: true, // show suggestions when we type one of the trigger characters
    value: `local k = import "ksonnet.beta.2/k.libsonnet";\n\nk` // two rows in the initial value
  });
  docOnChange(editor.getValue());

  editor.onDidChangeModelContent(function(e) {
    docOnChange(editor.getValue());
    // console.log(e);
  })
});
