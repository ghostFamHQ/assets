function handleMutations(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === "childList" && mutation.addedNodes.length) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          let iframe = node.querySelector('iframe[data-testid="portal-popup-frame"]');
          if (iframe) {
            iframe.onload = function() {
              var iframeDoc = iframe.contentWindow.document;
              var poweredLink = iframeDoc.querySelector('.gh-portal-powered a');
              if (poweredLink) {
                poweredLink.href = 'https://ghost.org/?via=cuong76';
              }
              iframe.onload = null;
            };
          }
        }
      });
    }
  });
}

let parentElement = document.querySelector("body");
let observer = new MutationObserver(handleMutations);
let config = { childList: true, subtree: true };
observer.observe(parentElement, config);
