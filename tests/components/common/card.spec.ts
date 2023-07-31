import { VueWrapper, mount } from '@vue/test-utils';
import Card from '@/components/common/Card.vue';
import Toggle from '@/components/common/Toggle.vue';

describe('Card', () => {
  let wrapper: VueWrapper<any>;
  let plugin = {
    id: 'plugin1',
    title: 'Plugin 1',
    description: 'Description 1',
    isActive: true,
  };

  beforeEach(() => {
    wrapper = mount(Card , {
      props: {
        plugin,
      },
      global: {
        components: {
          Toggle,
        },
      },
    });
  });

  it('renders the correct title', () => {
    const title = wrapper.find('.card__title');
    expect(title.text()).toBe(plugin.title);
  });

  it('renders the correct description', () => {
    const description = wrapper.find('.card__description');
    expect(description.text()).toBe(plugin.description);
  });

  it('emits the correct event when the button is clicked', async () => {
    const toggle = wrapper.findComponent(Toggle);
    await toggle.trigger('click');
    expect(wrapper.emitted()).toBeTruthy();
  });
});
