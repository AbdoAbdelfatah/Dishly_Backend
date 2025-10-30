import {MenuItemService} from "./service.js";
import {OfferService} from "../offer/service.js";
const menuItemService = new MenuItemService();
const offerService = new OfferService();
export class MenuItemController {
    async createMenuItem(req, res) {
        try {
            const menuItemData = req.body;
            const item = await menuItemService.createMenuItem(menuItemData);
            res.status(201).json(item);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async getAllMenuItemsAndOfferMenuItem(req, res) {
        try {
            const [items,offers] = await Promise.all([
                menuItemService.getAllMenuItems(),
                offerService.getAllOffers(),
            ]);
            const itemsWithOffers = items.map(item => {
                const offer = offers.find(offer => offer.menuItems.some(menuItemId => menuItemId.toString() === item._id.toString()));
                return {
                    ...item,
                    offer: offer ? {
                        title: offer.title,
                        discountPercent: `${offer.discountPercent}%`,
                        priceAfterDiscount: item.price * (1 - offer.discountPercent / 100),
                    } : null,
                };
            });

            res.status(200).json({ items: itemsWithOffers });
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async getMenuItemsByCategory(req, res) {
        try {
            const category = req.params.category;
            const items = await menuItemService.getMenuItemByCategory(category);
            res.status(200).json(items);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async updateMenuItem(req, res) {
        try {
            const itemId = req.params.id;
            const updateData = req.body;
            const updatedItem = await menuItemService.updateMenuItem(itemId, updateData);
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async deleteMenuItem(req, res) {
        try {
            const itemId = req.params.id;
            const deletedItem = await menuItemService.deleteMenuItem(itemId);
            res.status(200).json(deletedItem);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}