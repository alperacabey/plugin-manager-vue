import { VueWrapper, shallowMount } from '@vue/test-utils';
import Toggle from '@/components/common/Toggle.vue';

describe('Toggle', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(Toggle , {
      props: {
        value: true,
      },
    });
  });

  it('renders the correct value', () => {
    const input = wrapper.find('input');
    expect(input.element.checked).toBe(true);
  });

  it('emits the correct event when the button is clicked', async () => {
    const input = wrapper.find('input');
    await input.trigger('change');
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('does not render the status if it is not provided', () => {
    const status = wrapper.find('.toggle__status');
    expect(status.exists()).toBe(false);
  });

  it('renders the status if showStatus is true', async () => {
    await wrapper.setProps({ showStatus: true });
    const label = wrapper.find('.toggle__status');
    expect(label.exists()).toBe(true);
  });

});
