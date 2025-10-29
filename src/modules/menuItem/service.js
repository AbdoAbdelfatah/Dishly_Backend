import menuItem from "../../models/menuItem.model.js"; 
import { ErrorClass } from "../../utils/error.util.js";
export class MenuItemService {
    async createMenuItem(menuItemData) {
        try {
            const item = new menuItem(menuItemData);
            await item.save();
            return item;
        } catch (error) {
            throw new ErrorClass('Failed to create menu item', 500, error.message, 'MenuItemService.createMenuItem');
        }
    }
    async getAllMenuItems() {
        try {
            const items = await menuItem.find().lean();
            return items;
        }
        catch (error) {
            throw new ErrorClass('Failed to get all menu items', 500, error.message, 'MenuItemService.getAllMenuItems');
        }   
    }

    async getMenuItemByCategory(category) {
        try {
            const items = await menuItem.find({ category});
            return items;
        } catch (error) {
            throw new ErrorClass('Failed to get menu items by category', 500, error.message, 'MenuItemService.getMenuItemByCategory');
        }
    }

    async updateMenuItem(itemId, updateData) {
        try {
            const item =  await menuItem.findById(itemId);
            if (!item) {
                throw new ErrorClass('Menu item not found', 404, { itemId }, 'MenuItemService.updateMenuItem');
            }
            Object.assign(item, updateData);
            await item.save();
            return item;
        } catch (error) {
            throw new ErrorClass('Failed to update menu item', 500, error.message, 'MenuItemService.updateMenuItem');
        }
    }
    async deleteMenuItem(itemId) {
        try {
            const item = await menuItem.findByIdAndDelete(itemId);
            return item;
        } catch (error) {   
            throw new ErrorClass('Failed to delete menu item', 500, error.message, 'MenuItemService.deleteMenuItem');
        }   
    }  
    
    


}
