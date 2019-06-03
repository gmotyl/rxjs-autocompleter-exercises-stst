export const $result = document.getElementById('result'),
  setResult = (value) => $result.innerHTML = `Result: ${value}`,
  $input = document.getElementById('input') as HTMLInputElement,
  clearInput = () => $input.value = null,
	$list = document.getElementById('list'),
  getList = (items) => `${items.map(i => `<li>${i}</li>`).join('')}`,
  renderList = names => $list.innerHTML = getList(names),
  clearList = () => renderList([])
