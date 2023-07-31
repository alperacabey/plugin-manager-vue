import { VueWrapper, mount } from "@vue/test-utils";
import LeftMenu from "@/components/layout/LeftMenu.vue";
import Toggle from "@/components/common/Toggle.vue";
import useData from "@/composables/useData";
import { bulkUpdate } from "@/services/api"

jest.mock("@/composables/useData");
jest.mock("@/services/api");

const mockTabsData = [{"id":"tab1","title":"Marketing","icon":"icon-marketing","plugins":[{"id":"plugin1","title":"Plugin 1","description":"Enim cillum tempor veniam do laboris excepteur laborum fugiat aute magna cillum.","isDisabled":false,"isActive":true},{"id":"plugin2","title":"Plugin 2","description":"Proident sunt consequat exercitation incididunt cupidatat quis ut ut eu ullamco nisi excepteur aliqua.","isDisabled":false,"isActive":true},{"id":"plugin3","title":"Plugin 3","description":"Amet ea quis qui reprehenderit laborum aute magna incididunt et dolore.","isDisabled":true,"isActive":false},{"id":"plugin4","title":"Plugin 4","description":"Sunt culpa labore consequat eu veniam laborum.","isDisabled":false,"isActive":true},{"id":"plugin5","title":"Plugin 5","description":"Proident laborum sint nisi enim non aliqua incididunt dolor voluptate tempor.","isDisabled":false,"isActive":false},{"id":"plugin6","title":"Plugin 6","description":"Qui cillum velit elit incididunt excepteur nostrud occaecat.","isDisabled":false,"isActive":false}]},{"id":"tab2","title":"Finance","icon":"icon-finance","plugins":[{"id":"plugin10","title":"Plugin 10","description":"Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit.","isDisabled":false,"isActive":false},{"id":"plugin7","title":"Plugin 7","description":"Culpa excepteur aliquip adipisicing sunt sunt proident aute eiusmod.","isDisabled":false,"isActive":true},{"id":"plugin8","title":"Plugin 8","description":"Eiusmod ex labore cillum elit.","isDisabled":false,"isActive":true},{"id":"plugin9","title":"Plugin 9","description":"Ut sit sit fugiat qui ullamco ea ea id qui esse magna.","isDisabled":true,"isActive":true}]},{"id":"tab3","title":"Personnel","icon":"icon-people","plugins":[{"id":"plugin11","title":"Plugin 11","description":"Consectetur sit amet velit cillum sunt cillum sunt.","isDisabled":false,"isActive":true},{"id":"plugin12","title":"Plugin 12","description":"Exercitation in aute ut ex aliqua ea.","isDisabled":true,"isActive":false},{"id":"plugin13","title":"Plugin 13","description":"Dolor laboris culpa ipsum aliqua velit mollit.","isDisabled":false,"isActive":false}]}];

const fetchDataMock = jest.fn();
const bulkUpdateMock = jest.fn();

(useData as jest.Mock).mockReturnValue({
  tabsData: mockTabsData,
  allEnabled: { value: true },
  fetchData: fetchDataMock,
});

(bulkUpdate as jest.Mock).mockImplementation(bulkUpdateMock);

describe("LeftMenu", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(LeftMenu, {
      props: {
        activeRoute: "home",
      },
      global: {
        components: {
          Toggle,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of tabs", () => {
    const tabs = wrapper.findAll(".left-menu__nav-link");
    expect(tabs.length).toBe(mockTabsData.length);
  });

  it("renders the correct tab titles", () => {
    const tabs = wrapper.findAll(".left-menu__nav-link");
    tabs.forEach((tab, index) => {
      expect(tab.text()).toBe(mockTabsData[index].title);
    });
  });

  it("sets the active class on the active route", async () => {
    const tabs = wrapper.findAll(".left-menu__nav-link");
    await tabs[0].trigger("click");
    expect(tabs[0].classes("left-menu__nav-link--active")).toBe(true);
    expect(tabs[1].classes("left-menu__nav-link--active")).toBe(false);
  });

  it("toggles the allEnabled prop when the Toggle component emits change event", async () => {
    const toggle = wrapper.findComponent(Toggle);
    await toggle.trigger("change", {});

    expect(bulkUpdateMock).toHaveBeenCalledWith({ allEnabled: false });
    expect(fetchDataMock).toHaveBeenCalled();
    expect(wrapper.vm.allEnabled.value).toBe(false);
  });

  it("handles errors when bulkUpdate throws an error", async () => {
    bulkUpdateMock.mockRejectedValueOnce(new Error("Test error"));
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const toggle = wrapper.findComponent(Toggle);
    await toggle.trigger("change", {});

    expect(consoleSpy).toHaveBeenCalledWith("Error");
    consoleSpy.mockRestore();
  });
});
