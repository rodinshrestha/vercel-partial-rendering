import { ClubFormType } from './club-form-type';

const clubFormHelper = (data: ClubFormType) => {
  const {
    content_module_title,
    form_position,
    show_contact_form,
    content_type,
    image,
    content,
    stamp_content,
    stamp_icon,
  } = data;
  return {
    src: image,
    content: content,
    position: form_position,
    title: content_module_title,
    showContactForm: show_contact_form,
    contentType: content_type,
    stampContent: stamp_content,
    stampIcon: stamp_icon,
  };
};

export default clubFormHelper;
