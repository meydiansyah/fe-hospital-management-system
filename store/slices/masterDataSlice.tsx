import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi } from "@/lib/api";
import type {
  Technology,
  Facility,
  Insurance,
  Partner,
  Department,
  Position,
  Specialization,
  SubSpecialization,
  TechnologySpecialization,
  Polyclinic,
  Offer,
  Membership,
  ArticleCategory,
  ArticleTag,
  University,
  Bank,
  Hospital,
  Doctor,
  CenterOfExcellence,
  Article,
  News,
  Milestone,
  Dictionary,
  Banner,
  About,
  Faq,
  Benefit,
  HelpCenter,
  Statistic,
  MedicalTourism,
} from "@/types/api";

export interface MasterDataState {
  // Technologies
  technologies: Technology[];
  technologiesLoading: boolean;
  technologiesError: string | null;

  // Facilities
  facilities: Facility[];
  facilitiesLoading: boolean;
  facilitiesError: string | null;

  // Insurances
  insurances: Insurance[];
  insurancesLoading: boolean;
  insurancesError: string | null;

  // Partners
  partners: Partner[];
  partnersLoading: boolean;
  partnersError: string | null;

  // Departments
  departments: Department[];
  departmentsLoading: boolean;
  departmentsError: string | null;

  // Positions
  positions: Position[];
  positionsLoading: boolean;
  positionsError: string | null;

  // Specializations
  specializations: Specialization[];
  specializationsLoading: boolean;
  specializationsError: string | null;

  // Sub Specializations
  subSpecializations: SubSpecialization[];
  subSpecializationsLoading: boolean;
  subSpecializationsError: string | null;

  // Technology Specializations
  technologySpecializations: TechnologySpecialization[];
  technologySpecializationsLoading: boolean;
  technologySpecializationsError: string | null;

  // Polyclinics
  polyclinics: Polyclinic[];
  polyclinicsLoading: boolean;
  polyclinicsError: string | null;

  // Offers
  offers: Offer[];
  offersLoading: boolean;
  offersError: string | null;

  // Memberships
  memberships: Membership[];
  membershipsLoading: boolean;
  membershipsError: string | null;

  // Article Categories
  articleCategories: ArticleCategory[];
  articleCategoriesLoading: boolean;
  articleCategoriesError: string | null;

  // Article Tags
  articleTags: ArticleTag[];
  articleTagsLoading: boolean;
  articleTagsError: string | null;

  // Universities
  universities: University[];
  universitiesLoading: boolean;
  universitiesError: string | null;

  // Banks
  banks: Bank[];
  banksLoading: boolean;
  banksError: string | null;

  // Hospitals
  hospitals: Hospital[];
  hospitalsLoading: boolean;
  hospitalsError: string | null;

  // Doctors
  doctors: Doctor[];
  doctorsLoading: boolean;
  doctorsError: string | null;

  // Center of Excellences
  centerOfExcellences: CenterOfExcellence[];
  centerOfExcellencesLoading: boolean;
  centerOfExcellencesError: string | null;

  // Articles
  articles: Article[];
  articlesLoading: boolean;
  articlesError: string | null;

  // News
  news: News[];
  newsLoading: boolean;
  newsError: string | null;

  // Corporate Config
  milestones: Milestone[];
  milestonesLoading: boolean;
  milestonesError: string | null;

  dictionaries: Dictionary[];
  dictionariesLoading: boolean;
  dictionariesError: string | null;

  banners: Banner[];
  bannersLoading: boolean;
  bannersError: string | null;

  about: About | null;
  aboutLoading: boolean;
  aboutError: string | null;

  faqs: Faq[];
  faqsLoading: boolean;
  faqsError: string | null;

  benefits: Benefit[];
  benefitsLoading: boolean;
  benefitsError: string | null;

  helpCenters: HelpCenter[];
  helpCentersLoading: boolean;
  helpCentersError: string | null;

  statistics: Statistic[];
  statisticsLoading: boolean;
  statisticsError: string | null;

  // Medical Tourism
  medicalTourism: MedicalTourism[];
  medicalTourismLoading: boolean;
  medicalTourismError: string | null;

  // Global loading state
  isInitialLoadComplete: boolean;
  initialLoadError: string | null;
}

const initialState: MasterDataState = {
  technologies: [],
  technologiesLoading: false,
  technologiesError: null,
  facilities: [],
  facilitiesLoading: false,
  facilitiesError: null,
  insurances: [],
  insurancesLoading: false,
  insurancesError: null,
  partners: [],
  partnersLoading: false,
  partnersError: null,
  departments: [],
  departmentsLoading: false,
  departmentsError: null,
  positions: [],
  positionsLoading: false,
  positionsError: null,
  specializations: [],
  specializationsLoading: false,
  specializationsError: null,
  subSpecializations: [],
  subSpecializationsLoading: false,
  subSpecializationsError: null,
  technologySpecializations: [],
  technologySpecializationsLoading: false,
  technologySpecializationsError: null,
  polyclinics: [],
  polyclinicsLoading: false,
  polyclinicsError: null,
  offers: [],
  offersLoading: false,
  offersError: null,
  memberships: [],
  membershipsLoading: false,
  membershipsError: null,
  articleCategories: [],
  articleCategoriesLoading: false,
  articleCategoriesError: null,
  articleTags: [],
  articleTagsLoading: false,
  articleTagsError: null,
  universities: [],
  universitiesLoading: false,
  universitiesError: null,
  banks: [],
  banksLoading: false,
  banksError: null,
  hospitals: [],
  hospitalsLoading: false,
  hospitalsError: null,
  doctors: [],
  doctorsLoading: false,
  doctorsError: null,
  centerOfExcellences: [],
  centerOfExcellencesLoading: false,
  centerOfExcellencesError: null,
  articles: [],
  articlesLoading: false,
  articlesError: null,
  news: [],
  newsLoading: false,
  newsError: null,
  milestones: [],
  milestonesLoading: false,
  milestonesError: null,
  dictionaries: [],
  dictionariesLoading: false,
  dictionariesError: null,
  banners: [],
  bannersLoading: false,
  bannersError: null,
  about: null,
  aboutLoading: false,
  aboutError: null,
  faqs: [],
  faqsLoading: false,
  faqsError: null,
  benefits: [],
  benefitsLoading: false,
  benefitsError: null,
  helpCenters: [],
  helpCentersLoading: false,
  helpCentersError: null,
  statistics: [],
  statisticsLoading: false,
  statisticsError: null,
  medicalTourism: [],
  medicalTourismLoading: false,
  medicalTourismError: null,
  isInitialLoadComplete: false,
  initialLoadError: null,
};

// Async thunks for fetching data
export const fetchTechnologies = createAsyncThunk(
  "masterData/fetchTechnologies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getTechnologies();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch technologies"
      );
    }
  }
);

export const fetchFacilities = createAsyncThunk(
  "masterData/fetchFacilities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getFacilities();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch facilities"
      );
    }
  }
);

export const fetchInsurances = createAsyncThunk(
  "masterData/fetchInsurances",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getInsurances();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch insurances"
      );
    }
  }
);

export const fetchPartners = createAsyncThunk(
  "masterData/fetchPartners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getPartners();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch partners"
      );
    }
  }
);

export const fetchDepartments = createAsyncThunk(
  "masterData/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getDepartments();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch departments"
      );
    }
  }
);

export const fetchPositions = createAsyncThunk(
  "masterData/fetchPositions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getPositions();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch positions"
      );
    }
  }
);

export const fetchSpecializations = createAsyncThunk(
  "masterData/fetchSpecializations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getSpecializations();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch specializations"
      );
    }
  }
);

export const fetchSubSpecializations = createAsyncThunk(
  "masterData/fetchSubSpecializations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getSubSpecializations();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch sub specializations"
      );
    }
  }
);

export const fetchTechnologySpecializations = createAsyncThunk(
  "masterData/fetchTechnologySpecializations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getTechnologySpecializations();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch technology specializations"
      );
    }
  }
);

export const fetchPolyclinics = createAsyncThunk(
  "masterData/fetchPolyclinics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getPolyclinics();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch polyclinics"
      );
    }
  }
);

export const fetchOffers = createAsyncThunk(
  "masterData/fetchOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getOffers();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch offers"
      );
    }
  }
);

export const fetchMemberships = createAsyncThunk(
  "masterData/fetchMemberships",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getMemberships();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch memberships"
      );
    }
  }
);

export const fetchArticleCategories = createAsyncThunk(
  "masterData/fetchArticleCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getArticleCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch article categories"
      );
    }
  }
);

export const fetchArticleTags = createAsyncThunk(
  "masterData/fetchArticleTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getArticleTags();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch article tags"
      );
    }
  }
);

export const fetchUniversities = createAsyncThunk(
  "masterData/fetchUniversities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getUniversities();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch universities"
      );
    }
  }
);

export const fetchBanks = createAsyncThunk(
  "masterData/fetchBanks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getBanks();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch banks"
      );
    }
  }
);

export const fetchHospitals = createAsyncThunk(
  "masterData/fetchHospitals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getHospitals();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch hospitals"
      );
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  "masterData/fetchDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getDoctors();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch doctors"
      );
    }
  }
);

export const fetchCenterOfExcellences = createAsyncThunk(
  "masterData/fetchCenterOfExcellences",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getCenterOfExcellences();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch center of excellences"
      );
    }
  }
);

export const fetchArticles = createAsyncThunk(
  "masterData/fetchArticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getArticles();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch articles"
      );
    }
  }
);

export const fetchNews = createAsyncThunk(
  "masterData/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getNews();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch news"
      );
    }
  }
);

export const fetchMilestones = createAsyncThunk(
  "masterData/fetchMilestones",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.corporateConfig.getMilestones();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch milestones"
      );
    }
  }
);

export const fetchDictionaries = createAsyncThunk(
  "masterData/fetchDictionaries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.corporateConfig.getDictionaries();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch dictionaries"
      );
    }
  }
);

export const fetchBanners = createAsyncThunk(
  "masterData/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.corporateConfig.getBanners();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch banners"
      );
    }
  }
);

export const fetchAbout = createAsyncThunk(
  "masterData/fetchAbout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.corporateConfig.getAbout();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch about"
      );
    }
  }
);

export const fetchFaqs = createAsyncThunk(
  "masterData/fetchFaqs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.corporateConfig.getFaqs();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch faqs"
      );
    }
  }
);

export const fetchBenefits = createAsyncThunk(
  "masterData/fetchBenefits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.corporateConfig.getBenefits();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch benefits"
      );
    }
  }
);

export const fetchHelpCenters = createAsyncThunk(
  "masterData/fetchHelpCenters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.corporateConfig.getHelpCenters();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch help centers"
      );
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  "masterData/fetchStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.corporateConfig.getStatistics();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch statistics"
      );
    }
  }
);

export const fetchMedicalTourism = createAsyncThunk(
  "masterData/fetchMedicalTourism",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.getMedicalTourism();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch medical tourism"
      );
    }
  }
);

// Combined initial fetch thunk
export const fetchAllInitialData = createAsyncThunk(
  "masterData/fetchAllInitialData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Fetch all data in parallel
      await Promise.allSettled([
        dispatch(fetchTechnologies()),
        dispatch(fetchFacilities()),
        dispatch(fetchInsurances()),
        dispatch(fetchPartners()),
        dispatch(fetchDepartments()),
        dispatch(fetchPositions()),
        dispatch(fetchSpecializations()),
        dispatch(fetchSubSpecializations()),
        dispatch(fetchTechnologySpecializations()),
        dispatch(fetchPolyclinics()),
        dispatch(fetchOffers()),
        dispatch(fetchMemberships()),
        dispatch(fetchArticleCategories()),
        dispatch(fetchArticleTags()),
        dispatch(fetchUniversities()),
        dispatch(fetchBanks()),
        dispatch(fetchHospitals()),
        dispatch(fetchDoctors()),
        dispatch(fetchCenterOfExcellences()),
        dispatch(fetchArticles()),
        dispatch(fetchNews()),
        dispatch(fetchMilestones()),
        dispatch(fetchDictionaries()),
        dispatch(fetchBanners()),
        dispatch(fetchAbout()),
        dispatch(fetchFaqs()),
        dispatch(fetchBenefits()),
        dispatch(fetchHelpCenters()),
        dispatch(fetchStatistics()),
        dispatch(fetchMedicalTourism()),
      ]);

      return true;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch initial data"
      );
    }
  }
);

const masterDataSlice = createSlice({
  name: "masterData",
  initialState,
  reducers: {
    resetInitialLoad: (state) => {
      state.isInitialLoadComplete = false;
      state.initialLoadError = null;
    },
  },
  extraReducers: (builder) => {
    // Technologies
    builder
      .addCase(fetchTechnologies.pending, (state) => {
        state.technologiesLoading = true;
        state.technologiesError = null;
      })
      .addCase(fetchTechnologies.fulfilled, (state, action) => {
        state.technologiesLoading = false;
        state.technologies = action.payload as Technology[];
      })
      .addCase(fetchTechnologies.rejected, (state, action) => {
        state.technologiesLoading = false;
        state.technologiesError = action.payload as string;
      });

    // Facilities
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.facilitiesLoading = true;
        state.facilitiesError = null;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.facilitiesLoading = false;
        state.facilities = action.payload as Facility[];
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.facilitiesLoading = false;
        state.facilitiesError = action.payload as string;
      });

    // Insurances
    builder
      .addCase(fetchInsurances.pending, (state) => {
        state.insurancesLoading = true;
        state.insurancesError = null;
      })
      .addCase(fetchInsurances.fulfilled, (state, action) => {
        state.insurancesLoading = false;
        state.insurances = action.payload as Insurance[];
      })
      .addCase(fetchInsurances.rejected, (state, action) => {
        state.insurancesLoading = false;
        state.insurancesError = action.payload as string;
      });

    // Partners
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.partnersLoading = true;
        state.partnersError = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.partnersLoading = false;
        state.partners = action.payload as Partner[];
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.partnersLoading = false;
        state.partnersError = action.payload as string;
      });

    // Departments
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.departmentsLoading = true;
        state.departmentsError = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departmentsLoading = false;
        state.departments = action.payload as Department[];
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.departmentsLoading = false;
        state.departmentsError = action.payload as string;
      });

    // Positions
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.positionsLoading = true;
        state.positionsError = null;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.positionsLoading = false;
        state.positions = action.payload as Position[];
      })
      .addCase(fetchPositions.rejected, (state, action) => {
        state.positionsLoading = false;
        state.positionsError = action.payload as string;
      });

    // Specializations
    builder
      .addCase(fetchSpecializations.pending, (state) => {
        state.specializationsLoading = true;
        state.specializationsError = null;
      })
      .addCase(fetchSpecializations.fulfilled, (state, action) => {
        state.specializationsLoading = false;
        state.specializations = action.payload as Specialization[];
      })
      .addCase(fetchSpecializations.rejected, (state, action) => {
        state.specializationsLoading = false;
        state.specializationsError = action.payload as string;
      });

    // Sub Specializations
    builder
      .addCase(fetchSubSpecializations.pending, (state) => {
        state.subSpecializationsLoading = true;
        state.subSpecializationsError = null;
      })
      .addCase(fetchSubSpecializations.fulfilled, (state, action) => {
        state.subSpecializationsLoading = false;
        state.subSpecializations = action.payload as SubSpecialization[];
      })
      .addCase(fetchSubSpecializations.rejected, (state, action) => {
        state.subSpecializationsLoading = false;
        state.subSpecializationsError = action.payload as string;
      });

    // Technology Specializations
    builder
      .addCase(fetchTechnologySpecializations.pending, (state) => {
        state.technologySpecializationsLoading = true;
        state.technologySpecializationsError = null;
      })
      .addCase(fetchTechnologySpecializations.fulfilled, (state, action) => {
        state.technologySpecializationsLoading = false;
        state.technologySpecializations = action.payload as TechnologySpecialization[];
      })
      .addCase(fetchTechnologySpecializations.rejected, (state, action) => {
        state.technologySpecializationsLoading = false;
        state.technologySpecializationsError = action.payload as string;
      });

    // Polyclinics
    builder
      .addCase(fetchPolyclinics.pending, (state) => {
        state.polyclinicsLoading = true;
        state.polyclinicsError = null;
      })
      .addCase(fetchPolyclinics.fulfilled, (state, action) => {
        state.polyclinicsLoading = false;
        state.polyclinics = action.payload as Polyclinic[];
      })
      .addCase(fetchPolyclinics.rejected, (state, action) => {
        state.polyclinicsLoading = false;
        state.polyclinicsError = action.payload as string;
      });

    // Offers
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.offersLoading = true;
        state.offersError = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offersLoading = false;
        state.offers = action.payload as Offer[];
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.offersLoading = false;
        state.offersError = action.payload as string;
      });

    // Memberships
    builder
      .addCase(fetchMemberships.pending, (state) => {
        state.membershipsLoading = true;
        state.membershipsError = null;
      })
      .addCase(fetchMemberships.fulfilled, (state, action) => {
        state.membershipsLoading = false;
        state.memberships = action.payload as Membership[];
      })
      .addCase(fetchMemberships.rejected, (state, action) => {
        state.membershipsLoading = false;
        state.membershipsError = action.payload as string;
      });

    // Article Categories
    builder
      .addCase(fetchArticleCategories.pending, (state) => {
        state.articleCategoriesLoading = true;
        state.articleCategoriesError = null;
      })
      .addCase(fetchArticleCategories.fulfilled, (state, action) => {
        state.articleCategoriesLoading = false;
        state.articleCategories = action.payload as ArticleCategory[];
      })
      .addCase(fetchArticleCategories.rejected, (state, action) => {
        state.articleCategoriesLoading = false;
        state.articleCategoriesError = action.payload as string;
      });

    // Article Tags
    builder
      .addCase(fetchArticleTags.pending, (state) => {
        state.articleTagsLoading = true;
        state.articleTagsError = null;
      })
      .addCase(fetchArticleTags.fulfilled, (state, action) => {
        state.articleTagsLoading = false;
        state.articleTags = action.payload as ArticleTag[];
      })
      .addCase(fetchArticleTags.rejected, (state, action) => {
        state.articleTagsLoading = false;
        state.articleTagsError = action.payload as string;
      });

    // Universities
    builder
      .addCase(fetchUniversities.pending, (state) => {
        state.universitiesLoading = true;
        state.universitiesError = null;
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.universitiesLoading = false;
        state.universities = action.payload as University[];
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.universitiesLoading = false;
        state.universitiesError = action.payload as string;
      });

    // Banks
    builder
      .addCase(fetchBanks.pending, (state) => {
        state.banksLoading = true;
        state.banksError = null;
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.banksLoading = false;
        state.banks = action.payload as Bank[];
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.banksLoading = false;
        state.banksError = action.payload as string;
      });

    // Hospitals
    builder
      .addCase(fetchHospitals.pending, (state) => {
        state.hospitalsLoading = true;
        state.hospitalsError = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.hospitalsLoading = false;
        state.hospitals = action.payload as Hospital[];
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.hospitalsLoading = false;
        state.hospitalsError = action.payload as string;
      });

    // Doctors
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.doctorsLoading = true;
        state.doctorsError = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctorsLoading = false;
        state.doctors = action.payload as Doctor[];
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.doctorsLoading = false;
        state.doctorsError = action.payload as string;
      });

    // Center of Excellences
    builder
      .addCase(fetchCenterOfExcellences.pending, (state) => {
        state.centerOfExcellencesLoading = true;
        state.centerOfExcellencesError = null;
      })
      .addCase(fetchCenterOfExcellences.fulfilled, (state, action) => {
        state.centerOfExcellencesLoading = false;
        state.centerOfExcellences = action.payload as CenterOfExcellence[];
      })
      .addCase(fetchCenterOfExcellences.rejected, (state, action) => {
        state.centerOfExcellencesLoading = false;
        state.centerOfExcellencesError = action.payload as string;
      });

    // Articles
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.articlesLoading = true;
        state.articlesError = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articlesLoading = false;
        state.articles = action.payload as Article[];
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.articlesLoading = false;
        state.articlesError = action.payload as string;
      });

    // News
    builder
      .addCase(fetchNews.pending, (state) => {
        state.newsLoading = true;
        state.newsError = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsLoading = false;
        state.news = action.payload as News[];
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.newsLoading = false;
        state.newsError = action.payload as string;
      });

    // Milestones
    builder
      .addCase(fetchMilestones.pending, (state) => {
        state.milestonesLoading = true;
        state.milestonesError = null;
      })
      .addCase(fetchMilestones.fulfilled, (state, action) => {
        state.milestonesLoading = false;
        state.milestones = action.payload as Milestone[];
      })
      .addCase(fetchMilestones.rejected, (state, action) => {
        state.milestonesLoading = false;
        state.milestonesError = action.payload as string;
      });

    // Dictionaries
    builder
      .addCase(fetchDictionaries.pending, (state) => {
        state.dictionariesLoading = true;
        state.dictionariesError = null;
      })
      .addCase(fetchDictionaries.fulfilled, (state, action) => {
        state.dictionariesLoading = false;
        state.dictionaries = action.payload as Dictionary[];
      })
      .addCase(fetchDictionaries.rejected, (state, action) => {
        state.dictionariesLoading = false;
        state.dictionariesError = action.payload as string;
      });

    // Banners
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.bannersLoading = true;
        state.bannersError = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.bannersLoading = false;
        state.banners = action.payload as Banner[];
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.bannersLoading = false;
        state.bannersError = action.payload as string;
      });

    // About
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.aboutLoading = true;
        state.aboutError = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.aboutLoading = false;
        state.about = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.aboutLoading = false;
        state.aboutError = action.payload as string;
      });

    // FAQs
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.faqsLoading = true;
        state.faqsError = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.faqsLoading = false;
        state.faqs = action.payload as Faq[];
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.faqsLoading = false;
        state.faqsError = action.payload as string;
      });

    // Benefits
    builder
      .addCase(fetchBenefits.pending, (state) => {
        state.benefitsLoading = true;
        state.benefitsError = null;
      })
      .addCase(fetchBenefits.fulfilled, (state, action) => {
        state.benefitsLoading = false;
        state.benefits = action.payload as Benefit[];
      })
      .addCase(fetchBenefits.rejected, (state, action) => {
        state.benefitsLoading = false;
        state.benefitsError = action.payload as string;
      });

    // Help Centers
    builder
      .addCase(fetchHelpCenters.pending, (state) => {
        state.helpCentersLoading = true;
        state.helpCentersError = null;
      })
      .addCase(fetchHelpCenters.fulfilled, (state, action) => {
        state.helpCentersLoading = false;
        state.helpCenters = action.payload as HelpCenter[];
      })
      .addCase(fetchHelpCenters.rejected, (state, action) => {
        state.helpCentersLoading = false;
        state.helpCentersError = action.payload as string;
      });

    // Statistics
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.statisticsLoading = true;
        state.statisticsError = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statisticsLoading = false;
        state.statistics = action.payload as Statistic[];
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.statisticsLoading = false;
        state.statisticsError = action.payload as string;
      });

    // Medical Tourism
    builder
      .addCase(fetchMedicalTourism.pending, (state) => {
        state.medicalTourismLoading = true;
        state.medicalTourismError = null;
      })
      .addCase(fetchMedicalTourism.fulfilled, (state, action) => {
        state.medicalTourismLoading = false;
        state.medicalTourism = action.payload as MedicalTourism[];
      })
      .addCase(fetchMedicalTourism.rejected, (state, action) => {
        state.medicalTourismLoading = false;
        state.medicalTourismError = action.payload as string;
      });

    // Initial Load Complete
    builder
      .addCase(fetchAllInitialData.fulfilled, (state) => {
        state.isInitialLoadComplete = true;
        state.initialLoadError = null;
      })
      .addCase(fetchAllInitialData.rejected, (state, action) => {
        state.isInitialLoadComplete = true;
        state.initialLoadError = action.payload as string;
      });
  },
});

export const { resetInitialLoad } = masterDataSlice.actions;
export default masterDataSlice.reducer;

