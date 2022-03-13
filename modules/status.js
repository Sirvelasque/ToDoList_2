class status {
  static classUpdate(e) {
    const row = e.target.parentElement;
    row.classList.toggle('completed');
  }

  static updateItem(e) {
    const checkbox = e.target;
    if (checkbox.checked) {
      return istrue();
    }
    return false;
  }

  static istrue() {
    return true;
  }
}
export default status;