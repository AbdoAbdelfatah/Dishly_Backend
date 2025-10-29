import {MenuItemService} from "../service.js";
import {OfferService} from "../../offer/service.js";
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
                        discountPercent: offer.discountPercent,
                    } : null,
                };
            });

            res.status(200).json({ items, offers });
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
      



}