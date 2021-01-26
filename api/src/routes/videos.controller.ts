import {RequestHandler} from 'express';
import Video from './Video';

//GET ALL VIDEOS
export const getVideos: RequestHandler = async (req, res) => {
    try {
        const videos = await Video.find();
        return res.json(videos);                            
    } catch (error) {
        res.json(error);
    }
}
//GET VIDEO BY ID
export const getVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findById(req.params.id);
    if(!videoFound) return res.status(204).json();
    return res.json(videoFound);
}
//CREATE VIDEO
export const createVideo: RequestHandler = async (req, res) => {
    const videoFound = Video.findOne({url: req.body.url});
    if(!videoFound){
        return res.status(301).json({message: "Video exists in db"})
    }else{
        const video = new Video(req.body);
        const savedVideo = await video.save()
            .then(savedVideo => res.json(savedVideo))
            .catch(err => console.log(err));
    }
}
//UPDATE VIDEO
export const updateVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findByIdAndUpdate(req.params.id, req.body);
    if(!videoFound) res.status(204).json({message: "Video not found"});
    return res.json(videoFound);    
}
//DELETE VIDEO
export const deleteVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findByIdAndDelete(req.params.id);
    if(!videoFound) return res.status(204).json();
    return res.json(videoFound);
}
