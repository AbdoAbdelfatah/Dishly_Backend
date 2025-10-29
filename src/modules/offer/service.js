import Offer from "../../models/offer.model.js";
import { ErrorClass } from "../../utils/error.util.js";
export class OfferService {

    async createOffer(offerData) {
        try {
            const offer = new Offer(offerData);
            await offer.save();
            return offer;
        } catch (error) {
            throw new ErrorClass('Failed to create offer', 500, error.message, 'OfferService.createOffer');
        }
    }
    async getAllOffers() {
        try {
            const offers = await Offer.find().select('title discountPercent menuItems').lean();
            return offers;
        }
        catch (error) {
            throw new ErrorClass('Failed to get all offers', 500, error.message, 'OfferService.getAllOffers');
        }
    }
    async updateOffer(offerId, updateData) {
        try {
            const offer =  await Offer.findById(offerId);
            if (!offer) {
                throw new ErrorClass('Offer not found', 404, { offerId }, 'OfferService.updateOffer');
            }
            Object.assign(offer, updateData);
            await offer.save();
            return offer;
        } catch (error) {
            throw new ErrorClass('Failed to update offer', 500, error.message, 'OfferService.updateOffer');
        }

    }
    async deleteOffer(offerId) {
        try {
            const offer = await Offer.findByIdAndDelete(offerId);
            return offer;
        } catch (error) {   
            throw new ErrorClass('Failed to delete offer', 500, error.message, 'OfferService.deleteOffer');
        }   
    }


}