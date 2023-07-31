import { ref, onMounted, Ref } from 'vue';
import { getData, updateData, getStatus } from '@/services/api';
import { Plugin, Tabs, UpdateRequestModel, Data } from "@/types"

const data = ref<Data>({
  tabs: [],
  tabdata: {},
  plugins: {},
});
const tabsData = ref<Tabs[]>([]);
const allEnabled = ref<boolean>(true);

export default function useData(): { tabsData: Ref<Tabs[]>, allEnabled: Ref<boolean>, fetchData: () => Promise<void> } {

  const createPluginObject = (pluginId: string, isActive: boolean, isDisabled: boolean): Plugin => {
    const pluginInfo = data.value.plugins[pluginId];
    return {
      id: pluginId,
      title: pluginInfo.title,
      description: pluginInfo.description,
      isDisabled,
      isActive,
    };
  }

  const mapTabsData = (): Tabs[] => data.value.tabs.map((tabId: string) => {
    const tabInfo = data.value.tabdata[tabId];
    const plugins: Plugin[] = [];

    const mergedPlugins = new Set([...tabInfo.active, ...tabInfo.inactive, ...tabInfo.disabled]);

    for (const pluginId of mergedPlugins) {
      plugins.push(createPluginObject(pluginId, tabInfo.active.includes(pluginId) || !tabInfo.inactive.includes(pluginId), tabInfo.disabled.includes(pluginId)));
    }

    plugins.sort((a, b) => a.title.localeCompare(b.title));

    return {
      id: tabId,
      title: tabInfo.title,
      icon: tabInfo.icon,
      plugins: plugins,
    };
  });

  const fetchData = async (): Promise<void> => {
    try {
      const response = await getData();
      data.value = response.data;
      tabsData.value = mapTabsData();
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  onMounted(async () => {
    await fetchData();
    allEnabled.value = await getStatus();
  });

  return { tabsData, allEnabled, fetchData };
}


export const updatePlugin = async (request: UpdateRequestModel) => {
  try {
    await updateData(request);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}