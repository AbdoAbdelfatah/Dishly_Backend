import {OfferService} from "../offer/service.js";
const offerService = new OfferService();


export class offerController {

    async getAllOffers(req, res) {
        try {
            const offers = await offerService.getAllOfferWithMenuItems();
            res.status(200).json(offers);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async createOffer(req, res) {
        try {
            const offerData = req.body;
            const offer = await offerService.createOffer(offerData);
            res.status(201).json(offer);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async updateOffer(req, res) {
        try {
            const offerId = req.params.id;
            const updateData = req.body;
            const updatedOffer = await offerService.updateOffer(offerId, updateData);
            res.status(200).json(updatedOffer);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async deleteOffer(req, res) {
        try {
            const offerId = req.params.id;
            const deletedOffer = await offerService.deleteOffer(offerId);
            res.status(200).json(deletedOffer);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }   
}