import ResourceManager, { type SystemSettingItem } from '@/components/system-settings/ResourceManager';

interface Props {
    items: SystemSettingItem[];
}

export default function ProductCategories({ items }: Props) {
    return (
        <ResourceManager
            title="Product Categories"
            singular="Product Category"
            resource="product-categories"
            items={items}
        />
    );
}
