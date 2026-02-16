export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

export const FRONTEND_BASE_URL =
  import.meta.env.VITE_FRONTEND_BASE_URL ?? 'http://localhost:5173'

export const PAYSTACK_CALLBACK_PATH = '/payment/callback'
export const PAYSTACK_CALLBACK_URL = `${FRONTEND_BASE_URL}${PAYSTACK_CALLBACK_PATH}`

export const BOOKING_STEP_TITLES = [
  'Enter Project Details',
  'Make Payment',
  'Upload Files',
  'Project Workspace',
] as const

export const SERVICES = [
  {
    id: 'mixing',
    name: 'Mixing',
    description:
      'Get your tracks balanced and polished. Blend your vocals and instruments to create a clean, cohesive sound ready for the final master.',
    price: 120,
  },
  {
    id: 'mastering',
    name: 'Mastering',
    description:
      'Give your tracks its final polish. Improved loudness, clarity and overall balance so your music sounds professional and consistent on all speakers and streaming platforms.',
    price: 90,
  },
  {
    id: 'dolby_atmos',
    name: 'Dolby Atmos',
    description:
      'Give your tracks a three-dimensional immersive sound. Enhanced music depth, movement and a more realistic listening experience.',
    price: 180,
  },
]

export const ADD_ONS = [
  {
    id: 'add_alts',
    name: 'Add Alts',
    price: 15,
  },
  {
    id: 'add_mastering',
    name: 'Add Mastering',
    price: 40,
  },
  {
    id: 'add_instrumental',
    name: 'Add Instrumental',
    price: 20,
  },
  {
    id: 'add_dolby_atmos',
    name: 'Add Dolby Atmos',
    price: 60,
  },
]

export const GENRES = [
  { id: 1, name: 'Hip Hop' },
  { id: 2, name: 'Rap' },
  { id: 3, name: 'Pop' },
  { id: 4, name: 'Rock' },
  { id: 5, name: 'Country' },
  { id: 6, name: 'Jazz' },
  { id: 7, name: 'Electronic' },
  { id: 8, name: 'Hip Hop' },
  { id: 9, name: 'Rap' },
  { id: 10, name: 'Pop' },
  { id: 11, name: 'Rock' },
  { id: 12, name: 'Country' },
  { id: 13, name: 'Jazz' },
  { id: 14, name: 'Electronic' },
]

export const DEFAULT_CUSTOMER_EMAIL = 'customer@audiqlab.com'
export const PAYSTACK_CURRENCY = 'NGN'
export const PAYMENT_REFERENCE_PREFIX = 'AUDIQ-'
export const CURRENCY_SYMBOL = '$'

export const LOCAL_STORAGE_KEYS = {
  ORDER_TOTAL: 'audiq_order_total',
  PAYMENT_REFERENCE: 'audiq_payment_reference',
  PROJECT_CODE: 'audiq_project_code',
  PROJECT_ID: 'audiq_project_id',
} as const

export const UPLOAD_VALIDATION = {
  allowedExtensions: ['.wav'],
  maxBytes: 2 * 1024 * 1024 * 1024,
} as const

export const UI_MESSAGES = {
  uploadInvalidType: 'Only WAV files are allowed.',
  uploadTooLarge: 'File size must be less than 2GB.',
  uploadFailed: 'Upload failed.',
  paymentInitFailed: 'Payment initialization failed.',
  paymentVerifyFailed: 'Payment verification failed.',
  paymentReferenceMissing:
    'Missing payment reference. Please initialize payment again.',
  paymentNotCompleted:
    'Payment not completed yet. Please finish payment on Paystack and try again.',
  paymentTotalInvalid: 'Order total must be greater than 0.',
  paymentRedirecting: 'Redirecting to Paystack...',
  paymentVerifyLoading: 'Verifying payment...',
  paymentInitializedTitle: 'Payment initialized',
  paymentInitializedBody:
    'Complete your payment in Paystack, then verify it here to unlock file uploads.',
  paymentVerifyButton: 'Verify Payment',
  paymentCloseButton: 'Close',
  uploadSuccessTitle: 'Your project is ready',
  uploadSuccessBody:
    'Your workspace is ready. Track progress, review updates, share feedback and stay connected with your engineer throughout the process.',
  uploadSuccessPrimary: 'Proceed to Workspace',
  uploadSuccessSecondary: 'Create Another Project',
  paystackCheckoutNote:
    'You will complete your payment securely on Paystack checkout.',
  paystackPoweredBy: 'Powered by:',
  uploadHint: 'WAV format only (max. < 2gb)',
  draftCreateFailed: 'Unable to create draft project.',
  draftSaving: 'Saving draft...',
} as const

export const API_MESSAGES = {
  requestFailed: 'Request failed',
} as const

export const COPY = {
  goBack: 'Go back',
  beginBookingTitle: 'Begin your project booking',
  beginBookingSubtitle:
    'Choose the service you need, fill in the basics, upload your files and secure your booking quickly.',
  changeServiceTitle: 'Change Service Selection',
  selectService: 'Select Service',
  selectedService: 'Selected',
  selectedServiceLabel: 'Selected Service',
  orderSummaryTitle: 'Order Summary',
  orderTotalLabel: 'Order Total',
  bookingDetailsTitle: 'Booking Details',
  checkoutTitle: 'Checkout',
  editProject: 'Edit Project',
  payWithPaystack: 'Pay with Paystack',
} as const

export const SERVICE_DETAIL_COPY = {
  title: 'Mixing',
  whatYouGetTitle: 'What You Get With This Service',
  whatYouGetItems: [
    'Cleaned and enhanced vocals',
    'EQ, compression, and effects applied for clarity and depth',
    'A cohesive mix that feels polished and ready for mastering',
    'A preview version for review and feedback',
  ],
  getStartedTitle: 'What do i need to get started ?',
  getStartedItems: [
    'Separate beat and vocal files',
    'High-quality audio files (WAV recommended)',
    'Stems properly labeled for easy workflow',
    'Any notes, references or examples of your preferred sound',
    'Optional: Effects or creative directions you want the engineer to follow',
  ],
} as const

export const BOOKING_DETAILS = [
  { label: 'Project Name', value: 'Sunrise Awaken' },
  { label: 'Genre', value: 'Afrobeat' },
  { label: 'Services', value: 'Mixing' },
  { label: 'Add-ons', value: 'Mastering' },
  { label: 'Service Provider', value: 'Jacob Jones' },
  { label: 'Total Mixing Tracks', value: '1' },
  { label: 'Delivery Date', value: '30/12/2025' },
]

export const PAYMENT_PAGE_COPY = {
  bookingDetailsTitle: 'Booking Details',
  checkoutTitle: 'Checkout',
  projectIdLabel: 'Project ID:',
  projectIdValue: 'SMPRO - 00128',
  payButtonPrefix: 'Pay',
} as const

export const PAYMENT_CALLBACK_COPY = {
  title: 'Payment Verification',
  verifying: 'Verifying your payment...',
  successTitle: 'Payment verified',
  successBody:
    'Your payment was confirmed. You can continue to upload your files.',
  failureTitle: 'Payment not verified',
  failureBody:
    'We could not confirm the payment yet. Please try again or return to checkout.',
  missingReference: 'Missing payment reference.',
  closeHint: 'You can close this tab and return to AudiqLab.',
  closeButton: 'Close',
} as const

export const PROJECT_STATUS = {
  draft: 'draft',
  ongoing: 'ongoing',
  completed: 'completed',
} as const

export const PROJECT_STATUS_LABELS = {
  [PROJECT_STATUS.draft]: 'Draft',
  [PROJECT_STATUS.ongoing]: 'Ongoing',
  [PROJECT_STATUS.completed]: 'Completed',
} as const

export const PROJECT_TABS = [
  { id: 'all', label: 'All' },
  { id: PROJECT_STATUS.ongoing, label: PROJECT_STATUS_LABELS.ongoing },
  { id: PROJECT_STATUS.draft, label: PROJECT_STATUS_LABELS.draft },
  { id: PROJECT_STATUS.completed, label: PROJECT_STATUS_LABELS.completed },
] as const

export const PROJECTS_PAGE_COPY = {
  title: 'Projects',
  heroTitle: 'Master your creative workspace',
  heroSubtitle:
    'Learn how to set up projects, collaborate with engineers and track deliveries in a few simple steps.',
  watchTutorial: 'Watch Tutorial',
  searchPlaceholder: 'Search projects',
  startProject: 'Start a Project',
  loadError: 'Failed to load projects.',
} as const

export const PROJECTS_PAGE_SIZE = 10

export const PROJECTS_TABLE_COPY = {
  projectName: 'Project Name',
  projectId: 'Project ID',
  serviceType: 'Service Type',
  status: 'Status',
  action: 'Action',
  viewProject: 'View Project',
} as const

export const PROJECT_DETAIL_COPY = {
  backToProjects: 'Go back to Projects',
  reviewBannerTitle: 'Review this version carefully',
  reviewBannerBody:
    'Listen to the track, leave clear feedback then approve or request changes.',
  revisionsAvailable: '2 revision rounds available',
  paymentRequiredBadge: 'Payment required',
  draftBannerTitle: 'Complete your project setup',
  draftBannerBody:
    'Finish payment to unlock file uploads and start the revision process.',
  completedBannerTitle: 'Project in progress',
  completedBannerBody:
    'Your payment is confirmed. Upload files and track revisions below.',
  loadingText: 'Loading project...',
  loadError: 'Failed to load project.',
  timelineTitle: 'Project Timeline',
  revisionTitle: 'Project Revision and Comments',
  projectDetailsTitle: 'Project Details',
  versionHistoryTitle: 'Version History',
  fileUploadsTitle: 'File Uploads',
  whatReviewedTitle: 'What should be reviewed',
  reviewHelpText:
    'Click on the waveform above to write timestamped note or write in the chat bar below to drop your comment. Ensure to leave specific feedbacks for the engineer to make the right adjustments.',
  commentPlaceholder: 'Type your reply here...',
  sendButton: 'Send',
  sendIcon: '^',
  revisitNote: '*You can always comeback to drop comments before delivery.*',
  commentAuthor: 'Jacob Jones',
  commentAge: '24hr ago',
  commentBody:
    'Hello Timon Singz, kindly listen to this first version of your mix and drop your feedback.',
  approveVersion: 'Approve Version',
  reviewVersion: 'Review Version',
  timelineEta: 'ETA: 5 days',
  audioStart: '0:00',
  audioEnd: '1:00',
  playLabel: 'Play',
  placeholderValue: '-',
  placeholderTitle: '...',
  viewInvoice: 'View Invoice',
  notPaid: 'Not paid',
  paid: 'Paid',
  deliveryEtaLabel: 'Delivery ETA:',
  totalCostLabel: 'Total Cost:',
  paymentStatusLabel: 'Payment Status:',
  genreLabel: 'Genre:',
  servicesLabel: 'Services:',
  addOnsLabel: 'Add-ons:',
  defaultEta: '30/12/2025',
  defaultAudioName: 'Sunrise Awaken.WAV',
  defaultAudioSize: '16mb',
  versionLabel: 'Version 1',
  awaitingReview: 'Awaiting Review',
} as const

export const PROJECT_DETAIL_REVIEW_ITEMS = [
  'Vocal Clarity',
  'Balance of instrument',
  'Loudness level',
  'Stereo width',
  'Overall feel',
] as const

export const PROJECT_DETAIL_TIMELINE = [
  {
    id: 'create',
    title: 'Create Project',
    description: 'Your project has been set up with the selected service and details.',
  },
  {
    id: 'payment',
    title: 'Make Payment',
    description: 'Payment was completed successfully and your project is now secured.',
  },
  {
    id: 'upload',
    title: 'File Upload',
    description: 'Your files have been uploaded and are ready for the engineer to review.',
  },
  {
    id: 'revision_1',
    title: 'First Revision',
    description: 'The engineer is currently working on your project. Expected delivery: 31/12/2025',
  },
  {
    id: 'revision_2',
    title: 'Second Revision',
    description: 'The engineer is currently working on your project. Expected delivery: 31/12/2025',
  },
  {
    id: 'delivery',
    title: 'Project Delivery',
    description: 'The engineer is currently working on your project. Expected delivery: 31/12/2025',
  },
] as const
