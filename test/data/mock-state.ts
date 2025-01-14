import { EthAccountType } from '@metamask/keyring-api';
import { ApprovalRequest } from '@metamask/approval-controller';
import { Json } from '@metamask/utils';
import { Cryptocurrency } from '@metamask/assets-controllers';
import { NameOrigin } from '@metamask/name-controller';
import { NetworkStatus } from '@metamask/network-controller';
import { BackgroundStateProxy } from '../../shared/types/metamask';
import { AccountAddress } from '../../app/scripts/controllers/account-order';
import { ETH_EOA_METHODS } from '../../shared/constants/eth-methods';
import { AlertTypes } from '../../shared/constants/alerts';
import { DEFAULT_BRIDGE_STATE } from '../../app/scripts/controllers/bridge/constants';
import { DEFAULT_BRIDGE_STATUS_STATE } from '../../app/scripts/controllers/bridge-status/constants';
import { AccountOverviewTabKey } from '../../shared/constants/app-state';
import { GasEstimateTypes } from '../../shared/constants/gas';
import {
  DeleteRegulationStatus,
  MetaMetricsEventFragment,
  MetaMetricsUserTrait,
} from '../../shared/constants/metametrics';
import { LedgerTransportTypes } from '../../shared/constants/hardware-wallets';

const ACCOUNT_ONE_ADDRESS: AccountAddress =
  '0x22517aca7e7899d5df9220eee48eb9b8dbea9887';
const ACCOUNT_TWO_ADDRESS: AccountAddress =
  '0xc1f48ad5bd8481aba84eac11df2d2bf29f09da72';
const ACCOUNT_THREE_ADDRESS: AccountAddress =
  '0x9dc33e6aeeea580d78d15691c1484aaf9d70eddd';
const ACCOUNT_ONE_NAME: string = 'Account 1';
const ACCOUNT_TWO_NAME: string = 'Account 2';
const ACCOUNT_THREE_NAME: string = 'Account 3';
const ACCOUNT_THREE_ID: string = '56830faa-776a-45d3-be9d-acd8b3b72812';
const ACCOUNT_ONE_ID: string = 'b7d38d3d-f195-4b68-a7a8-9152c9e458b3';
const ACCOUNT_TWO_ID: string = 'd87d01dd-aed9-497e-b673-aa6cb3a8e25e';

const ACCOUNT_ONE_BALANCE: string = '0x68155a43676deb7e0';
const ZERO_BALANCE: string = '0x0';
const ACCOUNT_TWO_BALANCE: string = '0x4563918244f400000';
const ETH_MAINNET = '0x1' as const;
const ETH_MAINNET_NAME: string = 'Ethereum Mainnet';
const SEPOLIA_NET = '0xaa36a7' as const;
const SEPOLIA_NET_NAME: string = 'Sepolia';
const SEPOLIA_TESTNET = '0xaa3861' as const;
const SEPOLIA_TESTNET_NAME: string = 'Sepolia Test';
const SEPOLIA_TESTNET_NETWORK_CLIENT_ID: string =
  '769efe6b-d702-4472-9cae-a5a22557a529';
const LINEA_SEPOLIA_NET = '0xe705' as const;
const LINEA_SEPOLIA_NET_NAME: string = 'Linea Sepolia';
const LINEA_MAINNET = '0xe708' as const;
const LINEA_MAINNET_NAME: string = 'Linea';

const MOCK_APPROVAL_ID = '1234567890';

type ApprovalRequestData = Record<string, Json>;
const MOCK_PENDING_APPROVAL: ApprovalRequest<ApprovalRequestData> = {
  id: MOCK_APPROVAL_ID,
  origin: 'https://test-dapp.metamask.io',
  time: Date.now(),
  type: 'test-approval',
  requestData: {
    header: [
      {
        key: 'headerText',
        name: 'Typography',
        children: 'Success mock',
        properties: {
          variant: 'h2',
          class: 'header-mock-class',
        },
      },
    ],
    message: 'Success message',
  },
  requestState: {},
  expectsResult: false,
};

export const GAS_FEE_CONTROLLER_ESTIMATES_MOCK = {
  low: '0x1',
  medium: '0x2',
  high: '0x3',
  gasPrice: '0x2',
};

const MOCK_CURRENCY_RATE = {
  conversionDate: 1738715823.942,
  conversionRate: 2718.93,
  usdConversionRate: 2718.93,
};

const SAMPLE_METAMETRICS_EVENT_FRAGMENT: MetaMetricsEventFragment = {
  id: 'sample-metametrics-event-fragment-id',
  persist: true,
  category: 'Unit Test',
  successEvent: 'sample persisted event success',
  failureEvent: 'sample persisted event failure',
  properties: {
    test: true,
  },
};

export const mockState: BackgroundStateProxy = {
  isInitialized: true,
  AccountOrderController: {
    pinnedAccountList: [ACCOUNT_ONE_ADDRESS],
    hiddenAccountList: [],
  },
  AccountTracker: {
    accounts: {
      [ACCOUNT_ONE_ADDRESS]: {
        address: ACCOUNT_ONE_ADDRESS,
        balance: ACCOUNT_ONE_BALANCE,
      },
      [ACCOUNT_THREE_ADDRESS]: {
        address: ACCOUNT_THREE_ADDRESS,
        balance: ZERO_BALANCE,
      },
      [ACCOUNT_TWO_ADDRESS]: {
        address: ACCOUNT_TWO_ADDRESS,
        balance: ACCOUNT_TWO_BALANCE,
      },
    },
    accountsByChainId: {
      [ETH_MAINNET]: {
        [ACCOUNT_ONE_ADDRESS]: {
          address: ACCOUNT_ONE_ADDRESS,
          balance: ZERO_BALANCE,
        },
        [ACCOUNT_TWO_ADDRESS]: {
          address: ACCOUNT_TWO_ADDRESS,
          balance: ZERO_BALANCE,
        },
        [ACCOUNT_THREE_ADDRESS]: {
          address: ACCOUNT_THREE_ADDRESS,
          balance: ZERO_BALANCE,
        },
      },
      [SEPOLIA_NET]: {
        [ACCOUNT_ONE_ADDRESS]: {
          address: ACCOUNT_ONE_ADDRESS,
          balance: ZERO_BALANCE,
        },
        [ACCOUNT_TWO_ADDRESS]: {},
        [ACCOUNT_THREE_ADDRESS]: {},
      },
      [SEPOLIA_TESTNET]: {
        [ACCOUNT_ONE_ADDRESS]: {
          address: ACCOUNT_ONE_ADDRESS,
          balance: ACCOUNT_ONE_BALANCE,
        },
        [ACCOUNT_THREE_ADDRESS]: {
          address: ACCOUNT_THREE_ADDRESS,
          balance: ZERO_BALANCE,
        },
        [ACCOUNT_TWO_ADDRESS]: {
          address: ACCOUNT_TWO_ADDRESS,
          balance: ACCOUNT_TWO_BALANCE,
        },
      },
    },
    currentBlockGasLimit: '0x2243e7d',
    currentBlockGasLimitByChainId: {
      [SEPOLIA_NET]: '0x223b4e4',
      [SEPOLIA_TESTNET]: '0x2243e7d',
    },
  },
  AccountsController: {
    internalAccounts: {
      accounts: {
        [ACCOUNT_THREE_ADDRESS]: {
          address: ACCOUNT_THREE_ADDRESS,
          id: ACCOUNT_THREE_ID,
          metadata: {
            importTime: 1738710472865,
            keyring: {
              type: 'HD Key Tree',
            },
            lastSelected: 1738710472867,
            name: ACCOUNT_THREE_NAME,
            nameLastUpdatedAt: 1738710472984,
          },
          methods: ETH_EOA_METHODS,
          options: {},
          scopes: ['eip155:0'],
          type: EthAccountType.Eoa,
        },
        [ACCOUNT_ONE_ADDRESS]: {
          address: ACCOUNT_ONE_ADDRESS,
          id: ACCOUNT_ONE_ID,
          metadata: {
            importTime: 1738710364695,
            keyring: {
              type: 'HD Key Tree',
            },
            lastSelected: 1738710474786,
            name: 'Account 1',
          },
          methods: ETH_EOA_METHODS,
          options: {},
          scopes: ['eip155:0'],
          type: EthAccountType.Eoa,
        },
        [ACCOUNT_TWO_ADDRESS]: {
          address: ACCOUNT_TWO_ADDRESS,
          id: ACCOUNT_TWO_ID,
          metadata: {
            importTime: 1738710442401,
            keyring: {
              type: 'HD Key Tree',
            },
            lastSelected: 1738710442403,
            name: 'Account 2',
            nameLastUpdatedAt: 1738710442517,
          },
          methods: ETH_EOA_METHODS,
          options: {},
          scopes: ['eip155:0'],
          type: EthAccountType.Eoa,
        },
      },
      selectedAccount: ACCOUNT_ONE_ADDRESS,
    },
  },
  AddressBookController: {
    addressBook: {
      '*': {
        [ACCOUNT_ONE_ADDRESS]: {
          address: ACCOUNT_ONE_ADDRESS,
          chainId: '*',
          isEns: false,
          memo: '',
          name: ACCOUNT_ONE_NAME,
        },
        [ACCOUNT_THREE_ADDRESS]: {
          address: ACCOUNT_THREE_ADDRESS,
          chainId: '*',
          isEns: false,
          memo: '',
          name: ACCOUNT_THREE_NAME,
        },
        [ACCOUNT_TWO_ADDRESS]: {
          address: ACCOUNT_TWO_ADDRESS,
          chainId: '*',
          isEns: false,
          memo: '',
          name: ACCOUNT_TWO_NAME,
        },
      },
    },
  },
  AlertController: {
    alertEnabledness: {
      [AlertTypes.smartTransactionsMigration]: true,
      [AlertTypes.unconnectedAccount]: true,
      [AlertTypes.web3ShimUsage]: true,
    },
    unconnectedAccountAlertShownOrigins: {},
    web3ShimUsageOrigins: {},
  },
  AnnouncementController: {
    announcements: {
      '25': {
        date: '1738710352827',
        id: 25,
        isShown: false,
      },
    },
  },
  AppMetadataController: {
    currentAppVersion: '12.10.1',
    currentMigrationVersion: 143,
    previousAppVersion: '',
    previousMigrationVersion: 0,
  },
  AppStateController: {
    browserEnvironment: {
      browser: 'chrome',
      os: 'mac',
    },
    popupGasPollTokens: [],
    notificationGasPollTokens: [],
    fullScreenGasPollTokens: [],
    snapsInstallPrivacyWarningShown: false,
    qrHardware: {},
    nftsDropdownState: {},
    signatureSecurityAlertResponses: {},
    switchedNetworkDetails: {},
    currentExtensionPopupId: 1715943310719,
    connectedStatusPopoverHasBeenShown: true,
    defaultHomeActiveTabName: AccountOverviewTabKey.Activity,
    hadAdvancedGasFeesSetPriorToMigration92_3: false,
    lastInteractedConfirmationInfo: {
      chainId: SEPOLIA_TESTNET,
      id: 'cf43c740-e34c-11ef-b56e-355b2551d7f7',
      timestamp: 1738710451212,
    },
    lastViewedUserSurvey: null,
    newPrivacyPolicyToastClickedOrClosed: null,
    newPrivacyPolicyToastShownDate: 1738710352827,
    nftsDetectionNoticeDismissed: false,
    onboardingDate: 1738710353603,
    outdatedBrowserWarningLastShown: null,
    recoveryPhraseReminderHasBeenShown: false,
    recoveryPhraseReminderLastShown: 1738710346079,
    showAccountBanner: true,
    showBetaHeader: false,
    showNetworkBanner: true,
    showPermissionsTour: true,
    showTestnetMessageInDropdown: true,
    slides: [
      {
        id: '1',
        title: 'Slide 1',
        description: 'Description 1',
        image: 'image1.jpg',
      },
      {
        id: '2',
        title: 'Slide 2',
        description: 'Description 2',
        image: 'image2.jpg',
      },
    ],
    surveyLinkLastClickedOrClosed: null,
    switchedNetworkNeverShowMessage: false,
    termsOfUseLastAgreed: 1738710355542,
    timeoutMinutes: 0,
    trezorModel: null,
  },
  ApprovalController: {
    pendingApprovals: {
      [MOCK_APPROVAL_ID]: MOCK_PENDING_APPROVAL,
    },
    pendingApprovalCount: 1,
    approvalFlows: [{ id: MOCK_APPROVAL_ID, loadingText: null }],
  },
  AuthenticationController: {
    isSignedIn: true,
    sessionData: {
      accessToken: 'accessToken',
      expiresIn: 'expiresIn',
      profile: {
        identifierId: 'identifierId',
        profileId: 'profileId',
      },
    },
  },
  BridgeController: {
    bridgeState: DEFAULT_BRIDGE_STATE,
  },
  BridgeStatusController: {
    bridgeStatusState: DEFAULT_BRIDGE_STATUS_STATE,
  },
  CronjobController: {
    events: {},
    jobs: {},
  },
  CurrencyController: {
    currencyRates: {
      ETH: MOCK_CURRENCY_RATE,
      LineaETH: MOCK_CURRENCY_RATE,
      'Sepolia ETH': MOCK_CURRENCY_RATE,
      SepoliaETH: MOCK_CURRENCY_RATE,
    },
    currentCurrency: 'usd',
  },
  DecryptMessageController: {
    unapprovedDecryptMsgs: {},
    unapprovedDecryptMsgCount: 0,
  },
  EncryptionPublicKeyController: {
    unapprovedEncryptionPublicKeyMsgs: {},
    unapprovedEncryptionPublicKeyMsgCount: 0,
  },
  EnsController: {
    ensEntries: {},
    ensResolutionsByAddress: {},
  },
  GasFeeController: {
    estimatedGasFeeTimeBounds: {},
    gasEstimateType: GasEstimateTypes.ethGasPrice,
    gasFeeEstimates: GAS_FEE_CONTROLLER_ESTIMATES_MOCK,
    gasFeeEstimatesByChainId: {
      [SEPOLIA_TESTNET]: {
        estimatedGasFeeTimeBounds: {},
        gasEstimateType: GasEstimateTypes.ethGasPrice,
        gasFeeEstimates: GAS_FEE_CONTROLLER_ESTIMATES_MOCK,
      },
    },
  },
  KeyringController: {
    vault: 'vault',
    isUnlocked: true,
    keyrings: [
      {
        type: 'HD Key Tree',
        accounts: [ACCOUNT_ONE_ADDRESS],
      },
    ],
  },
  LoggingController: {
    logs: {},
  },
  MetaMetricsController: {
    metaMetricsId:
      '0xd94e3a4dfae14deecbd15b842432e2e2501907ddef6674b5bb0279ed731f5e3c',
    dataCollectionForMarketing: true,
    eventsBeforeMetricsOptIn: [],
    fragments: {
      [SAMPLE_METAMETRICS_EVENT_FRAGMENT.id]: SAMPLE_METAMETRICS_EVENT_FRAGMENT,
    },
    latestNonAnonymousEventTimestamp: 1738715878446,
    marketingCampaignCookieId: null,
    participateInMetaMetrics: true,
    previousUserTraits: {
      [MetaMetricsUserTrait.AddressBookEntries]: 3,
      [MetaMetricsUserTrait.CurrentCurrency]: 'usd',
      [MetaMetricsUserTrait.HasMarketingConsent]: true,
      [MetaMetricsUserTrait.InstallDateExt]: '',
      [MetaMetricsUserTrait.IsMetricsOptedIn]: true,
      [MetaMetricsUserTrait.LedgerConnectionType]: LedgerTransportTypes.webhid,
      [MetaMetricsUserTrait.NetworksAdded]: [
        ETH_MAINNET,
        SEPOLIA_NET,
        LINEA_SEPOLIA_NET,
        LINEA_MAINNET,
        SEPOLIA_TESTNET,
      ],
      [MetaMetricsUserTrait.NetworksWithoutTicker]: [],
      [MetaMetricsUserTrait.NftAutodetectionEnabled]: true,
      [MetaMetricsUserTrait.NumberOfAccounts]: 3,
      [MetaMetricsUserTrait.NumberOfNftCollections]: 0,
      [MetaMetricsUserTrait.NumberOfNfts]: 0,
      [MetaMetricsUserTrait.NumberOfTokens]: 0,
      [MetaMetricsUserTrait.OpenSeaApiEnabled]: true,
      [MetaMetricsUserTrait.PetnameAddressCount]: 3,
      [MetaMetricsUserTrait.SecurityProviders]: ['blockaid'],
      [MetaMetricsUserTrait.Theme]: 'os',
      [MetaMetricsUserTrait.PrivacyModeEnabled]: false,
      [MetaMetricsUserTrait.NetworkFilterPreference]: [ETH_MAINNET],
      [MetaMetricsUserTrait.ThreeBoxEnabled]: false,
      [MetaMetricsUserTrait.TokenDetectionEnabled]: true,
      [MetaMetricsUserTrait.TokenSortPreference]: '',
    },
    segmentApiCalls: {},
    traits: {},
  },
  MetaMetricsDataDeletionController: {
    metaMetricsDataDeletionId: '123',
    metaMetricsDataDeletionTimestamp: 1620710815497,
    metaMetricsDataDeletionStatus: DeleteRegulationStatus.Finished,
  },
  MultichainBalancesController: {
    balances: {},
  },
  MultichainRatesController: {
    cryptocurrencies: [Cryptocurrency.Btc, Cryptocurrency.Solana],
    fiatCurrency: 'usd',
    rates: {
      [Cryptocurrency.Btc]: {
        conversionDate: 0,
        conversionRate: 0,
      },
      [Cryptocurrency.Solana]: {
        conversionDate: 0,
        conversionRate: 0,
      },
    },
  },
  NameController: {
    nameSources: {},
    names: {
      ethereumAddress: {
        [ACCOUNT_ONE_ADDRESS]: {
          '*': {
            name: ACCOUNT_ONE_NAME,
            origin: NameOrigin.ACCOUNT_IDENTITY,
            proposedNames: {},
            sourceId: null,
          },
        },
        [ACCOUNT_THREE_ADDRESS]: {
          '*': {
            name: ACCOUNT_THREE_NAME,
            origin: NameOrigin.ACCOUNT_IDENTITY,
            proposedNames: {},
            sourceId: null,
          },
        },
        [ACCOUNT_TWO_ADDRESS]: {
          '*': {
            name: ACCOUNT_TWO_NAME,
            origin: NameOrigin.ACCOUNT_IDENTITY,
            proposedNames: {},
            sourceId: null,
          },
        },
      },
    },
  },
  NetworkController: {
    networkConfigurationsByChainId: {
      [ETH_MAINNET]: {
        blockExplorerUrls: ['https://etherscan.io'],
        chainId: ETH_MAINNET,
        defaultBlockExplorerUrlIndex: 0,
        defaultRpcEndpointIndex: 0,
        name: ETH_MAINNET_NAME,
        nativeCurrency: 'ETH',
        rpcEndpoints: [
          {
            networkClientId: 'mainnet',
            type: 'infura',
            url: 'https://mainnet.infura.io/v3/{infuraProjectId}',
          },
        ],
      },
      [SEPOLIA_NET]: {
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
        chainId: SEPOLIA_NET,
        defaultBlockExplorerUrlIndex: 0,
        defaultRpcEndpointIndex: 0,
        name: SEPOLIA_NET_NAME,
        nativeCurrency: 'SepoliaETH',
        rpcEndpoints: [
          {
            networkClientId: 'sepolia',
            type: 'infura',
            url: 'https://sepolia.infura.io/v3/{infuraProjectId}',
          },
        ],
      },
      [SEPOLIA_TESTNET]: {
        blockExplorerUrls: [],
        chainId: SEPOLIA_TESTNET,
        defaultRpcEndpointIndex: 0,
        lastUpdatedAt: 1738710411356,
        name: SEPOLIA_TESTNET_NAME,
        nativeCurrency: 'Sepolia ETH',
        rpcEndpoints: [
          {
            networkClientId: SEPOLIA_TESTNET_NETWORK_CLIENT_ID,
            type: 'custom',
            url: 'https://virtual.sepolia.rpc.tenderly.co/d46ee364-ca4d-4d84-8e99-106d830200e1',
          },
        ],
      },
      [LINEA_SEPOLIA_NET]: {
        blockExplorerUrls: ['https://sepolia.lineascan.build'],
        chainId: LINEA_SEPOLIA_NET,
        defaultBlockExplorerUrlIndex: 0,
        defaultRpcEndpointIndex: 0,
        name: LINEA_SEPOLIA_NET_NAME,
        nativeCurrency: 'LineaETH',
        rpcEndpoints: [
          {
            networkClientId: 'linea-sepolia',
            type: 'infura',
            url: 'https://linea-sepolia.infura.io/v3/{infuraProjectId}',
          },
        ],
      },
      [LINEA_MAINNET]: {
        blockExplorerUrls: ['https://lineascan.build'],
        chainId: LINEA_MAINNET,
        defaultBlockExplorerUrlIndex: 0,
        defaultRpcEndpointIndex: 0,
        name: LINEA_MAINNET_NAME,
        nativeCurrency: 'ETH',
        rpcEndpoints: [
          {
            networkClientId: 'linea-mainnet',
            type: 'infura',
            url: 'https://linea-mainnet.infura.io/v3/{infuraProjectId}',
          },
        ],
      },
    },
    networksMetadata: {
      [SEPOLIA_TESTNET_NETWORK_CLIENT_ID]: {
        EIPS: {
          '1559': true,
        },
        status: NetworkStatus.Available,
      },
      mainnet: {
        EIPS: {
          '1559': true,
        },
        status: NetworkStatus.Available,
      },
      sepolia: {
        EIPS: {
          '1559': true,
        },
        status: NetworkStatus.Available,
      },
    },
    selectedNetworkClientId: 'mainnet',
  },
  NetworkOrderController: {
    orderedNetworkList: [
      {
          networkId: ETH_MAINNET,
        },
      {
        networkId: LINEA_MAINNET,
      },
      {
        networkId: SEPOLIA_TESTNET,
      },
    ],
  },
  NftController: {
    allNftContracts: {},
    allNfts: {},
    ignoredNfts: [],
  },
};
