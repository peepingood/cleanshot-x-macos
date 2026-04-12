function copyTextFromBlock(btn) {
  var block = btn.closest('[data-copy-as]');
  return (block && block.getAttribute('data-copy-as')) || btn.getAttribute('data-copy') || '';
}

document.querySelectorAll('.copy-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var text = copyTextFromBlock(btn);
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      btn.classList.add('copied');
      btn.textContent = 'Copied';
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.textContent = 'Copy';
      }, 2000);
    });
  });
});

document.addEventListener('copy', function (e) {
  var sel = window.getSelection();
  if (!sel || !sel.rangeCount || sel.isCollapsed) return;
  var range = sel.getRangeAt(0);
  var root = range.commonAncestorContainer;
  var el = root.nodeType === Node.ELEMENT_NODE ? root : root.parentElement;
  if (!el || !el.closest) return;
  var block = el.closest('[data-copy-as]');
  if (!block || !block.contains(root)) return;
  var text = block.getAttribute('data-copy-as');
  if (!text) return;
  e.preventDefault();
  e.clipboardData.setData('text/plain', text);
});
