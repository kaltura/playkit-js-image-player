export type ThumbnailApiParams = {
  version?: number; //The widget ID
  width?: number; //Requested width in pixels
  height?: number; //Requested height in pixels
  type?: 1 | 2; // Type of crop to be used – see remarks below
  nearest_aspect_ratio?: 1 | 2; // If 1, the image will be resized to nearest aspect ratio (based on the original image/video), and only then cropped to the desired dimensions. This will override the type parameter
  bgcolor?: string; // 6 hex digits web color code
  quality?: number; // JPEG quality for output (0-100). The default is 75
  src_x?: number; // 1st part of a rectangle to take from original picture
  src_y?: number; // 2nd part of a rectangle to take from original picture
  src_w?: number; // 3rd part of a rectangle to take from original picture
  src_h?: number; // 4th part of a rectangle to take from original picture
  rel_width?: number; // Actual width of the image from which the src_* parameters were taken
  rel_height?: number; // Actual height of the image from which the src_* parameters were taken
  vid_sec?: number; // The time to snap a frame from the video (to get a specific frame # use; second=frame/(durationSec * FPS)
  vid_slice?: number; // Number of slice out of number of slices
  vid_slices?: number; // Number of slices
  start_sec?: number; // The second (or part of second) to begin extracting the slices stripe from (e.g. to avoid black frame in videos that begin with fade to black, set start_sec to the second that is after the black transition). This param defaults to 0 if t set or invalid. If start_sec will be set to a higher number than end_sec, the API will return 404 error.
  end_sec?: number; // The second (or part of second) to stop extracting slices at (e.g. to create a stripe animation that is smooth but only contains few frames, use this parameter to only extract a short segment of your video instead of extracting slices across the entire video). This param defaults to the duration of the video if t provided or set to invalid value.
  upload_token_id?: string; // An ID of an uploadToken object representing a file that was recently uploaded (upload tokens are invalid after 2 weeks) to generate the image from
  flavor_id?: number; // An ID of a specific video flavor to generate the image from
  format?: string; // Specify an output file format for the generated image. Supported values are?: JPG, JPEG, JXR, PNG, PNG8/24/32/48/64, BMP, GIF, TIF, PSD, and PDF.
  ks?: string; // Kaltura Session string. Only mandatory if the account is configured to require session on thumbnails request
  referrer?: string; // base64 of a URL, use if entry’s thumbnail access control is set to force domain
  file_name?: string; // Used to specify a file name for the generated image. Must be the last parameter on the list to generate a URL that ends with a filename.extension
};

export const defaultThumbnailApiParams: ThumbnailApiParams = {
  quality: 100
};
