import PO from '../page-object';

const { create, visitable, selectable, text } = PO;

export default create({
  visit: visitable('/proposals/:id'),
  selectDelegate: selectable('.delegate-select'),
  successFlashMessage: text('.alert.alert-success')
});
