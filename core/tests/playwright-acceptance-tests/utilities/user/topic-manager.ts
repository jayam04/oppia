// Copyright 2026 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Topic manager utility file.
 */

import {Page, expect, ElementHandle} from '@playwright/test';
import {BaseUser} from '../common/playwright-utils';
import testConstants from '../common/test-constants';
import {showMessage} from '../common/show-message';

const navbarBreadcrumbSelector = '.e2e-test-navbar-breadcrumb';
const topicNameField = '.e2e-test-topic-name-field';
const topicEditorUrlFragmentField =
  '.e2e-test-topic-url-fragment-field .e2e-test-url-fragment-field';
const displayMobileFiltersButton = '.e2e-test-mobile-toggle-filter';
const mobileTopicFilterResetSelector = '.e2e-test-mobile-topic-filter-reset';
const resetTopicFilterButtonSelector = '.e2e-test-topic-filter-reset';
const sortDropdownSelector = '.e2e-test-select-sort-dropdown';
const topicStatusDropdownSelector = '.e2e-test-select-topic-status-dropdown';
const classroomDropdownSelector = '.e2e-test-select-classroom-dropdown';
const skillStatusDropdownSelector = '.e2e-test-select-skill-status-dropdown';
const closeMobileFiltersButton = '.e2e-test-mobile-filter-close';
const keywordDropdownSelector = '.e2e-test-select-keyword-dropdown';
const multiSelectionInputSelector = '.e2e-test-multi-selection-input';
const multiSelectionInputChipSelector = '.e2e-test-multi-selection-chip';
const skillsTab = 'a.e2e-test-skills-tab';
const mobileSkillSelector = 'span.e2e-test-mobile-skill-name';
const desktopSkillSelector = '.e2e-test-skill-description';
const skillSelectInQuestionTabSelector =
  '.e2e-test-select-skill-dropdown mat-select';
const questionTextSelector = '.e2e-test-question-text';
const addQuestionButtonSelector = '.e2e-test-create-question-button';
const saveQuestionButton = 'button.e2e-test-save-question-button';
const mobileNavbarDropdown =
  'div.navbar-mobile-options .e2e-test-mobile-navbar-dropdown';
const mobileOptionsSelector = '.e2e-test-mobile-options-base';
const mobileTopicSelector = 'div.e2e-test-mobile-topic-name a';
const desktopTopicSelector = 'a.e2e-test-topic-name';

const modalDiv = 'div.modal-content';
const closeSaveModalButton = '.e2e-test-close-save-modal-button';
const saveChangesMessageInput = 'textarea.e2e-test-commit-message-input';
const uploadPhotoButton = 'button.e2e-test-photo-upload-submit';
const photoUploadModal = 'edit-thumbnail-modal';
const subtopicReassignHeader = 'div.subtopic-reassign-header';
const subtopicTitleField = '.e2e-test-subtopic-title-field';
const subtopicUrlFragmentField =
  '.e2e-test-subtopic-url-fragment-field .e2e-test-url-fragment-field';
const richTextAreaField = 'div.e2e-test-rte';
const subtopicPhotoBoxButton =
  '.e2e-test-subtopic-thumbnail .e2e-test-photo-button';
const mobileSaveTopicButton =
  'div.navbar-mobile-options .e2e-test-mobile-save-topic-button';
const saveTopicButton = 'button.e2e-test-save-topic-button';
const subtopicCardHeader = '.subtopic-name-card-header';
const subtopicTitleSelector = '.e2e-test-subtopic';
const topicPreviewTab = '.e2e-test-topic-preview-button';
const contentTitle = '.content-title';
const htmlContent = '.html-content';
const editSubtopicExplanationSelector = '.e2e-test-edit-html-content';
const topicMobilePreviewTab = '.e2e-test-mobile-preview-tab';
const optionsSelector = '.e2e-test-show-subtopic-options';
const deleteSubtopicButtonSelector = '.e2e-test-delete-subtopic-button';
const topicEditorSaveModelSelector = 'oppia-topic-editor-save-modal';
const subtopicEditorContainerSelector = '.e2e-test-subtopic-editor-container';
const subtopicPreviewContainerSelector = '.e2e-test-subtopic-preview-container';
const subtopicExpandHeaderSelector = '.e2e-test-show-subtopics-list';
const mobileSubtopicContainerSelector = '.e2e-test-mobile-subtopic-content';
const saveSubtopicExplanationButtonSelector =
  '.e2e-test-save-subtopic-content-button';
const topicEditorContainerSelector = '.e2e-test-topic-editor-container';
const topicsTab = 'a.e2e-test-topics-tab';

const topicsAndSkillsDashboardUrl = testConstants.URLs.TopicAndSkillsDashboard;

const topicAndSkillsDashboardUrl = testConstants.URLs.TopicAndSkillsDashboard;
const curriculumAdminThumbnailImage =
  testConstants.data.curriculumAdminThumbnailImage;
const chapterPhotoBoxButton = '.e2e-test-photo-button';
const skillEditBox = '.e2e-test-skill-edit-box';
const mobileSkillsOption = '.e2e-test-mobile-skills-option';
const unassignSkillButtonDesktop = '.e2e-test-unassign-skill-button';
const unassignSkillButtonMobile = '.e2e-test-mobile-unassign-skill-button';
const confirmUnassignSkillButton = '.e2e-test-confirm-unassign-skill-button';
const unassignTopicLabel = '.e2e-test-unassign-topic-label';
const unassignTopicCheckbox = '.e2e-test-unassign-topic';
const topicNameSpan = '.topic-name';
const desktopSkillItemSelector = '.e2e-test-skill-item';
const mobileSkillItemSelector = '.e2e-test-mobile-skill-item';
const desktopSkillDescriptionSelector = '.e2e-test-skill-description';
const mobileSkillDescriptionSelector = '.e2e-test-mobile-skill-name';
const assignSkillButtonDesktop = '.e2e-test-assign-skill-to-topic-button';
const assignSkillButtonMobile = '.e2e-test-mobile-assign-skill-to-topic-button';
const topicNameSelector = '.e2e-test-topic-name-in-topic-select-modal';
const confirmMoveButton = '.e2e-test-confirm-move-button';
const mergeSkillsButtonMobile = '.e2e-test-mobile-merge-skills-button';
const mergeSkillsButtonDesktop = '.e2e-test-merge-skills-button';
const skillsAssignmentSelector = '.e2e-test-skill-assignments';
const discardChangesInMobileNavSelector =
  '.e2e-test-mobile-discard-changes-direct';
const saveStoryButton = 'button.e2e-test-save-story-button';
const mobileSaveStoryChangesButton =
  'div.navbar-mobile-options .e2e-test-mobile-save-changes';
const addChapterButton = 'button.e2e-test-add-chapter-button';
const chapterTitleField = '.e2e-test-chapter-title-field';
const mobileChapterCollapsibleCard = '.e2e-test-mobile-add-chapter';
const mobileBackToStoryEditorButton = '.oppia-mobile-back-to-parent';
const storyEditorBreadcrumbStoryNameSelector =
  '.topic-story-name .chapter-name';
const chapterEditorBreadcrumbStoryNameSelector =
  '.e2e-test-back-to-story-editor-button';
const chapterEditorBreadcrumbChapterNameSelector =
  '.story-chapter-name .chapter-name';
const desktopSkillQuestionTab = '.e2e-test-questions-tab';
const toastMessageSelector = '.e2e-test-toast-message';
const toastWarningContainerSelector = '.e2e-test-toast-warning';
const closeToastMessageButtonSelector = 'button.e2e-test-close-toast-warning';
const editQuestionButtons = '.e2e-test-edit-question-button';
const linkOffIcon = '.link-off-icon';
const removeQuestionConfirmationButtonSelector =
  '.e2e-test-remove-question-confirmation-button';
const questionPreviewTab = '.e2e-test-question-preview-tab';
const questionTextInput = '.e2e-test-question-text-input';
const questionContentSelector = '.e2e-test-conversation-content';
const numericInputInteractionField = '.e2e-test-conversation-input';
const skillNameInputSelector = '.e2e-test-skill-name-input';
const radioInnerCircleSelector = '.mat-radio-inner-circle';
const radioInnerCircleContainerSelector = '.mat-radio-container';
const confirmSkillSelectionButtonSelector =
  '.e2e-test-confirm-skill-selection-button';
const navigationDropdown = '.e2e-test-mobile-skill-nav-dropdown-icon';
const mobilePreviewTab = '.e2e-test-mobile-preview-tab';
const mobileSkillQuestionTab = '.e2e-test-mobile-questions-tab';
const newChapterTitleField = 'input.e2e-test-new-chapter-title-field';
const newChapterExplorationIdField = 'input.e2e-test-chapter-exploration-input';
const newChapterPhotoBoxButton =
  '.e2e-test-chapter-input-thumbnail .e2e-test-photo-button';
const createChapterButton = 'button.e2e-test-confirm-chapter-creation-button';
const newChapterErrorMessageSelector =
  '.acceptance-restricted-interaction-error';
const topicNextPageMobileButton = '.e2e-test-mobile-topics-next-page-button';
const topicNextPageDesktopButton = '.e2e-test-topics-next-page-button';
const skillsNextPageMobileButton = '.e2e-test-mobile-skills-next-page-button';
const skillsNextPageDesktopButton = '.e2e-test-skills-next-page-button';
const itemsPerPageDropdown = '.e2e-test-select-items-per-page-dropdown';
const filterOptionSelector = '.mat-option-text';
const errorPageHeadingSelector = '.e2e-test-error-page-heading';
const createNewTopicMobileButton = '.e2e-test-create-topic-mobile-button';
const createNewTopicButton = '.e2e-test-create-topic-button';
const createNewSkillMobileButton =
  '.e2e-test-mobile-create-skill-button-secondary';
const createNewSkillButton = '.e2e-test-create-skill-button-circle';
const desktopTopicListItemSelector = '.list-item';
const mobileTopicListItemSelector = '.topic-item';
const desktopTopicListItemOptions = '.e2e-test-topic-edit-box';
const mobileTopicListItemOptions = '.e2e-test-mobile-topic-edit-box';
const desktopDeleteTopicButton = '.e2e-test-delete-topic-button';
const mobileDeleteTopicButton = '.e2e-test-mobile-delete-topic-button';
const desktopSkillListItemSelector = '.list-item';
const mobileSkillListItemSelector = '.skill-item';
const desktopSkillListItemOptions = '.e2e-test-skill-edit-box';
const desktopDeleteSkillButton = '.e2e-test-delete-skill-button';
const mobileSkillListItemOptions = '.e2e-test-mobile-skills-option';
const mobileDeleteSkillButton = '.e2e-test-mobile-delete-skill-button';
const misconceptionTitleSelector =
  '.oppia-skill-misconception-card-preview-list .e2e-test-worked-example-title';
const misconceptionTitleElement = '.e2e-test-worked-example-title';
const skillPrerequisiteTitleSelector = '.skill-prerequisite-link';
const skillDescriptionCardSelector = '.skill-description-card';
const skillPrerequisiteLinkSelector = '.skill-prerequisite-link';
const removeSkillIconSelector = '.remove-skill-icon';
const misconceptionDeleteButtonSelector = '.e2e-test-delete-example-button';
const saveOrPublishSkillSelector = '.e2e-test-save-or-publish-skill';
const mobileSaveOrPublishSkillSelector = '.e2e-test-mobile-save-skill-changes';
const mobileSkillNavToggle =
  'div.e2e-test-mobile-toggle-skill-nav-dropdown-icon';
const commitMessageInputSelector = '.e2e-test-commit-message-input';
const closeSaveModalButtonSelector = '.e2e-test-close-save-modal-button';
const skillPreviewModalTitleSelector = '.skill-preview-modal-title';
const skillPreviewModalContentSelector = '.skill-preview-modal-content';
const selectRubricDifficultySelector = '.e2e-test-select-rubric-difficulty';
const rteSelector = '.e2e-test-rte';
const saveRubricExplanationButton = '.e2e-test-save-rubric-explanation-button';
const editConceptCardSelector = '.e2e-test-edit-concept-card';
const saveConceptCardSelector = '.e2e-test-save-concept-card';
const addButtonSelector = '.e2e-test-add-misconception-modal-button';
const misconceptionCardHeader = 'div.oppia-misconception-card-header';
const nameFieldSelector = '.e2e-test-misconception-name-field';
const saveMisconceptionButton = '.e2e-test-confirm-add-misconception-button';
const misconceptionListSelector =
  '.oppia-skill-misconception-card-preview-list';
const confirmDeleteMisconceptionButton =
  '.e2e-test-confirm-delete-misconception-button';
const optionalMisconceptionToggle = '.e2e-test-misconception-optional-check';
const topicMetaTagInput = '.e2e-test-topic-meta-tag-content-field';
const updateTopicWebFragmentField = '.e2e-test-topic-page-title-fragment-field';
const updateTopicDescriptionField = '.e2e-test-topic-description-field';
const photoBoxButton = 'div.e2e-test-photo-button';
const practiceTabToggle = '.e2e-test-toggle-practice-tab';
const topicPreviewTitleSelector = '.e2e-test-preview-topic-title';
const topicPreviewDescriptionSelector = '.e2e-test-preview-topic-description';
const reassignSkillButton = '.e2e-test-reassign-skill-button';
const editIcon = '.subtopic-header';
const renameSubtopicField = '.e2e-test-rename-subtopic-field';
const saveReassignments = '.e2e-test-save-reassignments';
const saveRearrangeSkills = '.e2e-test-save-rearrange-skills';
const subtopicAssignmentContainer = '.subtopics-container';
const storyTitleSelector = '.e2e-test-story-title';
const chapterTitleSelector = '.e2e-test-chapter-title';
const chapterDescriptionField = '.e2e-test-add-chapter-description';
const showChapterPreviewButton = '.show-chapter-preview-button';
const titleSelector = '.oppia-thumbnail-preview-title';
const descriptionSelector = '.oppia-thumbnail-preview-description';
const storyListItemSelector = '.e2e-test-story-list-item';
const deleteStoryButtonSelector = '.e2e-test-delete-story-button';
const confirmStoryDeletionButton = '.e2e-test-confirm-story-deletion-button';
const editOptionsSelector = '.e2e-test-edit-options';
const deleteChapterButtonSelector = '.e2e-test-delete-chapter-button';
const moveChapterUpButtonSelector = '.e2e-test-move-chapter-up-button';
const moveChapterDownButtonSelector = '.e2e-test-move-chapter-down-button';
const storyEditorNodeSelector = '.story-editor-node';
const resetChapterThumbnailButton = '.e2e-test-thumbnail-reset-button';
const chapterOutlineEditorContainer =
  '.e2e-test-chapter-outline-editor-container';
const nodeOutlineSaveButton = '.e2e-test-node-outline-save-button';
const addPrerequisiteSkillButton = '.e2e-test-add-prerequisite-skill';
const addPrerequisiteSkillMobileButtonSelector =
  '.e2e-test-mobile-add-prerequisite-skill';
const removePrerequisiteSkillButtonSelector =
  '.e2e-test-remove-prerequisite-skill';
const removeAcquiredSkillButtonSelector = '.e2e-test-remove-acquired-skill';
const addPrerequisiteSkillInSkillEditorButton =
  '.e2e-test-add-prerequisite-skill-in-skill-editor-button';
const togglePrerequisiteSkillsDropdown =
  '.e2e-test-toggle-prereq-skills-dropdown';
const toggleSkillRubricsDropdown = '.e2e-test-toggle-rubrics-dropdown';
const addAcquiredSkillButton = '.e2e-test-add-acquired-skill';
const mobileCollapsibleCardHeaderSelector =
  '.oppia-mobile-collapsible-card-header';
const mobileStoryDropdown = '.e2e-test-story-dropdown';
const confirmDeleteChapterButton = '.e2e-test-confirm-delete-chapter-button';
const questionContainerSelector = '.e2e-test-skill-questions-container';
const skillPreviewContainerSelector = '.e2e-test-skill-preview-container';
const topicEditorMainTabFormSelector = '.e2e-test-topic-editor-main-tab';
const topicPreviewContainerSelector = '.e2e-test-topic-preview-container';
const skillEditorContainer = '.e2e-test-skill-editor-container';
const conceptCardPreviewModelSelector = '.e2e-test-concept-card-preview-modal';
const skillEditorCollapsibleCardSelector =
  '.e2e-test-skill-editor-collapsible-card';
const storyEditorContainerSelector = '.e2e-test-story-editor';
const chapterEditorContainerSelector = '.e2e-test-chapter-editor';
const chapterPreviewContainerSelector = '.e2e-test-thumbnail-container';
const addSkillButton = 'button.e2e-test-add-skill-button';
const skillNameInput = '.e2e-test-skill-name-input';
const skillItem = '.e2e-test-skills-list-item';
const skillSelectionItemSelector = '.e2e-test-skill-selection-item';
const confirmSkillButton = '.e2e-test-confirm-skill-selection-button';
const deleteSkillButton = 'i.skill-delete-button';
const mobileToggleSkillCard = '.e2e-test-toggle-skill-card';
const removeSkillModalHeaderSelector =
  '.e2e-test-delete-state-skill-modal-header';
const addMisconceptionHeaderSelector =
  '.e2e-test-oppia-misconception-card-header';
const unsavedChangesWarningModalSelector =
  '.e2e-test-unsaved-changes-info-modal';
const staleTabWarningModalSelector = '.e2e-test-stale-tab-info-modal';
const mobileSaveTopicDropdown =
  'div.navbar-mobile-options .e2e-test-mobile-save-topic-dropdown';
const mobilePublishTopicButton =
  'div.navbar-mobile-options .e2e-test-mobile-publish-topic-button';
const publishTopicButton = 'button.e2e-test-publish-topic-button';
const topicAndSkillDashboardSelector = '.e2e-test-topics-and-skills-dashboard';
const skillEditorSelector = '.e2e-test-skill-editor';
const topicAndSkillsOptionInProfileMenu =
  '.e2e-test-topics-and-skills-dashboard-link';
const topicAndSkillsDashboardPageSelector =
  '.e2e-test-topics-and-skills-dashboard';
const floatTextField = '.e2e-test-rule-details .e2e-test-float-form-input';
const solutionFloatTextField =
  'oppia-add-or-update-solution-modal .e2e-test-float-form-input';
const textStateEditSelector = 'div.e2e-test-state-edit-content';
const saveContentButton = 'button.e2e-test-save-state-content';
const createQuestionButton = 'div.e2e-test-create-question';
const addInteractionButton = 'button.e2e-test-open-add-interaction-modal';
const interactionNumberInputButton =
  'div.e2e-test-interaction-tile-NumericInput';
const interactionNameDiv = 'div.oppia-interaction-tile-name';
const saveInteractionButton = 'button.e2e-test-save-interaction';
const responseRuleDropdown =
  'oppia-rule-type-selector.e2e-test-answer-description';
const equalsRuleButtonText = 'is equal to ... ';
const answersInGroupAreCorrectToggle =
  'input.e2e-test-editor-correctness-toggle';
const saveResponseButton = 'button.e2e-test-add-new-response';
const defaultFeedbackTab = 'a.e2e-test-default-response-tab';
const openOutcomeFeedBackEditor = 'div.e2e-test-open-outcome-feedback-editor';
const saveOutcomeFeedbackButton = 'button.e2e-test-save-outcome-feedback';
const openAnswerGroupFeedBackEditor = 'i.e2e-test-open-feedback-editor';
const addHintButton = 'button.e2e-test-oppia-add-hint-button';
const saveHintButton = 'button.e2e-test-save-hint';
const addSolutionButton = 'button.e2e-test-oppia-add-solution-button';
const answerTypeDropdown = 'select.e2e-test-answer-is-exclusive-select';
const submitAnswerButton = 'button.e2e-test-submit-answer-button';
const submitSolutionButton = 'button.e2e-test-submit-solution-button';
const linkAnotherSkillToQuestionButton = '.e2e-test-link-another-skill-button';
const questionDifficultyHeaderSelector = '.e2e-test-question-difficulty-header';
const successToastSelector = '.toast-success';
const skillLinkageItemSelector = '.e2e-test-skill-linkage-item';
const skillLinkageDescriptionSelector = '.e2e-test-skill-linkage-description';
const skillLinkageRemoveButtonSelector =
  '.e2e-test-remove-skill-linkage-button';
const previewSubtabClass = 'e2e-test-preview-subtab';
const storyTitleInStoryEditorSelector = '.e2e-test-story-title-field';
const storyDescriptionInStoryEditorSelector =
  '.e2e-test-story-description-field';
const storyMetaTagContentInStoryEditorSelector =
  '.e2e-test-story-meta-tag-content-field';
const storyUrlFragmentInStoryEditorSelector = '.e2e-test-url-fragment-field';
const showDiscardOptionButtonSelector = '.e2e-test-show-discard-option';
const discardStoryChangesButtonSelector = '.e2e-test-discard-story-changes';
const prerequisiteSkillSelector =
  '.e2e-test-prerequisite-skill-description-card';
const prerequisiteSkillMobileSelector =
  '.e2e-test-mobile-prerequisite-skill-description-card';
const aquiredSkillSkillSelector = '.e2e-test-acquired-skill-description-card';
const aquiredSkillSkillMobileSelector =
  '.e2e-test-mobile-acquired-skill-description-card';
const activeTabSelector = '.e2e-test-active-tab';
const storyRowSelector = 'tr.e2e-test-story-list-item';
const thumbnailDescriptionSelector = '.e2e-test-thumbnail-description';
const thumbnailTitleSelector = '.e2e-test-thumbnail-title';
const questionEditorContainer = '.e2e-test-question-editor-container';
const confirmSkillDificultyButton =
  'button.e2e-test-confirm-skill-difficulty-button';
const skillSelectionModalSelector = '.e2e-test-skill-container';
const noSkillsPresentMessageSelector = '.e2e-test-no-skills-present-message';
const expandStoryHeaderSelector =
  '.e2e-test-mobile-stories-collapsible-card-header';
const addNewStoryButtonSelector = '.e2e-test-create-story-button';
const skillEditOptionsContainerSelector =
  '.e2e-test-skill-edit-options-container';
const navigationContainerSelector = '.e2e-test-mobile-navigation-bar-container';
const responseGroupDiv = '.e2e-test-response-tab';
const toggleResponseTab = '.e2e-test-response-tab-toggle';
const misconceptionTitle = '.e2e-test-misconception-title';
const activeTabClass = 'e2e-test-active-tab';
const previewQuestionSelector = '.e2e-test-preview-question';
const toggleSkillEditOptionsButton =
  'div.e2e-test-mobile-toggle-skill-nav-dropdown-icon';
const outlineEditorInput = '.e2e-test-rte';
const saveOutlineButton = '.e2e-test-node-outline-save-button';
const finalizeOutlineCheckbox = '.e2e-test-finalize-outline';
const publishUptoChaptersDropdownSelector =
  'select.e2e-test-publish-up-to-chapter-dropdown';
const mobileReadyToPublishButton = '.ready-to-publish-mobile-option';
const markAsReadyToPublishButton = '.e2e-test-mark-as-ready-to-publish-button';
const mobileSaveStoryChangesDropdown =
  'div.navbar-mobile-options .e2e-test-mobile-changes-dropdown';
const mobilePublishStoryButton =
  'div.navbar-mobile-options .e2e-test-mobile-publish-button';
const storyNodeSelector = 'tr.story-node';
const publishChapterButton = '.e2e-test-publish-chapters-button';
const chapterStatusSelector = '.e2e-test-chapter-status';
const mobileAcquiredSkillsSectionBodySelector =
  '.e2e-test-section-body-acquired-skills';
const warningIndicatorSelector = '.e2e-test-warning-indicator';
const warningTextSelector = '.e2e-test-warnings-text';

export class TopicManager extends BaseUser {
  /**
   * Open the topic editor page for a topic.
   */
  async openTopicEditor(topicName: string): Promise<void> {
    const topicNameSelector = this.isViewportAtMobileWidth()
      ? mobileTopicSelector
      : desktopTopicSelector;
    await this.navigateToTopicAndSkillsDashboardPage();
    await this.clickOnElementWithSelector(topicsTab);
    await this.expectElementToBeVisible(topicNameSelector);

    await Promise.all([
      this.clickOnElementWithSelectorAndText(topicNameSelector, topicName),
      this.page.waitForNavigation(),
    ]);

    expect(this.page.url()).toContain('/topic_editor/');
  }

  /**
   * Saves topic draft.
   * @param {string} topicName - name of the topic to be saved.
   * @param {string} description - description of the topic to be saved.
   */
  async saveTopicDraft(topicName: string, description?: string): Promise<void> {
    await this.expectElementToBeVisible(modalDiv, false);
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(mobileOptionsSelector);
      await this.clickOnElementWithSelector(mobileSaveTopicButton);
      await this.expectElementToBeVisible(topicEditorSaveModelSelector);
      await this.typeInInputField(
        saveChangesMessageInput,
        'Test saving topic as curriculum admin.'
      );
      await this.expectElementToBeVisible(
        `${closeSaveModalButton}:not([disabled])`
      );
      await this.clickOnElementWithSelector(closeSaveModalButton);
      await this.expectElementToBeVisible(topicEditorSaveModelSelector, false);
    } else {
      await this.clickOnElementWithSelector(saveTopicButton);
      if (description) {
        await this.typeInInputField(saveChangesMessageInput, description);
        await this.expectElementValueToBe(saveChangesMessageInput, description);
      }
      await this.expectElementToBeVisible(
        `${closeSaveModalButton}:not([disabled])`
      );
      await this.waitForElementToStabilize(closeSaveModalButton);
      await this.clickOnElementWithSelector(closeSaveModalButton);
      await this.expectElementToBeVisible(modalDiv, false);
    }
  }

  /**
   * Opens the subtopic editor for a given subtopic and topic.
   * @param {string} subtopicName - The name of the subtopic to open.
   * @param {string} topicName - The name of the topic that contains the subtopic.
   */
  async openSubtopicEditor(
    subtopicName: string,
    topicName?: string
  ): Promise<void> {
    if (topicName) {
      await this.openTopicEditor(topicName);
    }

    // Expand subtopic list if it is not expanded.
    if (
      this.isViewportAtMobileWidth() &&
      !(await this.isElementVisible(mobileSubtopicContainerSelector))
    ) {
      await this.expectElementToBeVisible(subtopicExpandHeaderSelector);
      await this.clickOnElementWithSelector(subtopicExpandHeaderSelector);
    }

    try {
      await this.page.waitForSelector(subtopicCardHeader);
      const subtopicElements = await this.page.$$(subtopicCardHeader);
      for (let i = 0; i < subtopicElements.length; i++) {
        const element = subtopicElements[i];
        await this.page.waitForSelector(subtopicTitleSelector);
        const titleElement = await element.$(subtopicTitleSelector);
        if (titleElement) {
          const titleTextContent = await this.page.evaluate(
            el => el.textContent,
            titleElement
          );
          if (titleTextContent && titleTextContent.includes(subtopicName)) {
            await this.waitForElementToBeClickable(titleElement);
            await titleElement.click();
            break;
          }
        }
      }
    } catch (error) {
      const newError = new Error(`Failed to open subtopic editor: ${error}`);
      newError.stack = (error as Error).stack;
      throw newError;
    }

    await this.expectElementToBeVisible(subtopicEditorContainerSelector);
  }

  /**
   * Edits the details of a subtopic.
   *
   * @param {string} title - The new title of the subtopic.
   * @param {string} urlFragment - The new URL fragment of the subtopic.
   * @param {string} explanation - The new explanation of the subtopic.
   * @param {string} thumbnail - The path to the new thumbnail image for the subtopic.
   */
  async editSubTopicDetails(
    title: string,
    urlFragment: string,
    explanation: string,
    thumbnail?: string
  ): Promise<void> {
    await this.expectElementToBeVisible(subtopicTitleField);
    await this.clearAllTextFrom(subtopicTitleField);
    await this.typeInInputField(subtopicTitleField, title);
    if (urlFragment) {
      await this.page.waitForSelector(subtopicUrlFragmentField, {
        state: 'visible',
      });
      await this.clearAllTextFrom(subtopicUrlFragmentField);
      await this.page.type(subtopicUrlFragmentField, urlFragment);
    }

    await this.clickOnElementWithSelector(editSubtopicExplanationSelector);
    await this.page.waitForSelector(richTextAreaField, {state: 'visible'});
    await this.clearAllTextFrom(richTextAreaField);
    await this.typeInInputField(richTextAreaField, explanation);
    await this.clickOnElementWithSelector(
      saveSubtopicExplanationButtonSelector
    );

    // Update the thumbnail if it is provided.
    if (thumbnail) {
      await this.clickOnElementWithSelector(subtopicPhotoBoxButton);
      await this.page.waitForSelector(photoUploadModal, {state: 'visible'});
      await this.uploadFile(thumbnail);
      await this.page.waitForSelector(`${uploadPhotoButton}:not([disabled])`);
      await this.clickOnElementWithSelector(uploadPhotoButton);
    }

    await this.expectElementToBeVisible(photoUploadModal, false);
  }

  /**
   * Deletes a subtopic from a topic.
   * @param {string} subtopicName - The name of the subtopic.
   * @param {string} topicName - The name of the topic.
   */
  async deleteSubtopicFromTopic(
    subtopicName: string,
    topicName: string
  ): Promise<void> {
    try {
      await this.openTopicEditor(topicName);
      await this.waitForStaticAssetsToLoad();

      if (this.isViewportAtMobileWidth()) {
        await this.clickOnElementWithSelector(subtopicReassignHeader);
      }

      await this.page.waitForSelector(subtopicCardHeader);
      const subtopics = await this.page.$$(subtopicCardHeader);

      for (const subtopic of subtopics) {
        const subtopicTitle = await subtopic.$eval(
          subtopicTitleSelector,
          el => el.textContent?.trim() || ''
        );

        if (subtopicTitle === subtopicName) {
          await subtopic.waitForSelector(optionsSelector);
          const optionsButton = await subtopic.$(optionsSelector);
          if (optionsButton) {
            await this.waitForElementToBeClickable(optionsButton);
            await optionsButton.click();
            await subtopic.waitForSelector(deleteSubtopicButtonSelector);
            const deleteButton = await subtopic.$(deleteSubtopicButtonSelector);
            if (deleteButton) {
              await this.waitForElementToBeClickable(deleteButton);
              await deleteButton.click();
              await this.expectElementToBeVisible(
                deleteSubtopicButtonSelector,
                false
              );
              showMessage(
                `Subtopic ${subtopicName} deleted from the topic ${topicName}.`
              );
              return;
            }
          }
        }
      }

      throw new Error(
        `Subtopic ${subtopicName} not found in topic ${topicName}.`
      );
    } catch (error) {
      const newError = new Error(
        `Failed to delete subtopic from topic: ${error}`
      );
      newError.stack = (error as Error).stack;
      throw newError;
    }
  }

  /**
   * Verifies the presence of a subtopic in a topic.
   * @param {string} subtopicName - The name of the subtopic.
   * @param {string} topicName - The name of the topic.
   * @param {boolean} shouldExist - Whether the subtopic should exist.
   */
  async verifySubtopicPresenceInTopic(
    subtopicName: string,
    topicName: string | null = null,
    shouldExist: boolean = true
  ): Promise<void> {
    // Navigate to topic editor if topic name is provided.
    if (topicName) {
      await this.openTopicEditor(topicName);
      await this.waitForStaticAssetsToLoad();

      if (this.isViewportAtMobileWidth()) {
        await this.clickOnElementWithSelector(subtopicReassignHeader);
      }
    }

    // Expand subtopic list if it is not expanded.
    if (
      this.isViewportAtMobileWidth() &&
      !(await this.isElementVisible(mobileSubtopicContainerSelector))
    ) {
      await this.expectElementToBeVisible(subtopicExpandHeaderSelector);
      await this.clickOnElementWithSelector(subtopicExpandHeaderSelector);
    }

    // Check if subtopic exists or not.
    await this.page.waitForFunction(
      ({selector, subtopicName, present}) => {
        const subtopicsElements = document.querySelectorAll(selector);
        const subtopics = Array.from(subtopicsElements).map(
          (el: Element) => el.textContent?.trim() || ''
        );
        return subtopics.includes(subtopicName) === present;
      },
      {
        selector: subtopicTitleSelector,
        subtopicName: subtopicName,
        present: shouldExist,
      },
      {timeout: 10000}
    );
  }

  /**
   * Navigates to the subtopic preview tab.
   */
  async navigateToSubtopicPreviewTab(
    subtopicName: string,
    topicName: string
  ): Promise<void> {
    await this.openSubtopicEditor(subtopicName, topicName);
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(mobileOptionsSelector);
      await this.clickOnElementWithSelector(mobileNavbarDropdown);
      await this.clickOnElementWithSelector(topicMobilePreviewTab);
    } else {
      await this.page.waitForSelector(topicPreviewTab);
      await this.clickOnElementWithSelector(topicPreviewTab);
    }

    await this.expectElementToBeVisible(subtopicPreviewContainerSelector);
    showMessage('Navigated to Subtopic Preview Tab');
  }

  /**
   * Checks if the preview subtopic has the expected name and explanation.
   * @param {string} subtopicName - The expected name of the subtopic.
   * @param {string} explanation - The expected explanation of the subtopic.
   */
  async expectSubtopicPreviewToHave(
    subtopicName: string,
    explanation: string
  ): Promise<void> {
    await this.page.waitForSelector(contentTitle);
    const previewSubtopicName = await this.page.$eval(
      contentTitle,
      el => el.textContent
    );
    if (previewSubtopicName !== subtopicName) {
      throw new Error(
        `Expected subtopic name to be "${subtopicName}", but it was "${previewSubtopicName}"`
      );
    }

    await this.page.waitForSelector(htmlContent);
    const isExplanationPresent = await this.isTextPresentOnPage(explanation);
    if (!isExplanationPresent) {
      throw new Error(
        `Expected explanation "${explanation}" to be present on the page, but it was not`
      );
    }
  }
  /**
   * Checks if the breadcrumb in the navbar contains the given text.
   */
  async expectNavbarBreadcrumbToContain(text: string): Promise<void> {
    await this.expectElementToBeVisible(navbarBreadcrumbSelector);
    await this.expectTextContentToContain(navbarBreadcrumbSelector, text);
  }

  /**
   * Checks if the topic name field and topic url field are disabled.
   */
  async expectTopicNameAndTopicURLInputToBeDisabled(): Promise<void> {
    const nameField = this.page.locator(topicNameField);
    const urlField = this.page.locator(topicEditorUrlFragmentField);
    await expect(nameField).toBeDisabled();
    await expect(urlField).toBeDisabled();
  }

  /**
   * Navigates to the Topics and Skills Dashboard page.
   */
  async navigateToTopicsAndSkillsDashboardPage(): Promise<void> {
    await this.goto(topicsAndSkillsDashboardUrl);
  }

  /**
   * Filters topics by status.
   */
  async filterTopicsByStatus(
    status: 'Published' | 'Not Published' | 'All'
  ): Promise<void> {
    await this.navigateToTopicsAndSkillsDashboardPage();
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(displayMobileFiltersButton);
    }
    await this.expectElementToBeVisible(topicStatusDropdownSelector);
    await this.selectMatOptionUsingSelector(
      topicStatusDropdownSelector,
      status
    );

    const dropdownValue = this.page.locator(
      `${topicStatusDropdownSelector} .mat-select-value-text`
    );
    await expect(dropdownValue).toHaveText(status);

    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(closeMobileFiltersButton);
    }
    showMessage(`Filtered topics by status: ${status}`);
  }

  /**
   * Checks if the filtered topics match the expected topics.
   */
  async expectFilteredTopics(
    expectedTopics: string[],
    visible: boolean = true
  ): Promise<void> {
    const topicNameSelector = this.isViewportAtMobileWidth()
      ? mobileTopicSelector
      : desktopTopicSelector;
    await this.waitForStaticAssetsToLoad();

    if (expectedTopics.length === 0) {
      throw new Error("Topics list can't be empty");
    }

    const topicElements = this.page.locator(topicNameSelector);
    const count = await topicElements.count();
    const topicNames: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await topicElements.nth(i).textContent())?.trim();
      if (text) {
        topicNames.push(text);
      }
    }

    const missingTopics = expectedTopics.filter(
      topic => !topicNames.includes(topic)
    );
    const matchedTopics = topicNames.filter(topic =>
      expectedTopics.includes(topic)
    );

    if (visible && missingTopics.length > 0) {
      throw new Error(
        `Expected topics "${missingTopics.join('", "')}" to be present, but they were not found.\n` +
          `Found topics: "${topicNames.join('", "')}"`
      );
    }

    if (!visible && matchedTopics.length > 0) {
      throw new Error(
        `Expected topics "${matchedTopics.join('", "')}" to not be present, but they were found.\n` +
          `Found topics: "${topicNames.join('", "')}"`
      );
    }

    showMessage('Filtered topics match the expected topics.');
  }

  /**
   * Resets the topic filter.
   */
  async resetTopicFilter(): Promise<void> {
    if (this.isViewportAtMobileWidth()) {
      await this.expectElementToBeVisible(displayMobileFiltersButton);
      await this.clickOnElementWithSelector(displayMobileFiltersButton);
      await this.clickOnElementWithSelector(mobileTopicFilterResetSelector);
    } else {
      await this.expectElementToBeVisible(resetTopicFilterButtonSelector);
      await this.clickOnElementWithSelector(resetTopicFilterButtonSelector);
    }

    const sortValue = this.page.locator(
      `${sortDropdownSelector} .mat-select-value-text`
    );
    await expect(sortValue).toHaveText('Most Recently Updated');

    if (await this.isElementVisible(topicStatusDropdownSelector)) {
      const statusValue = this.page.locator(
        `${topicStatusDropdownSelector} .mat-select-value-text`
      );
      await expect(statusValue).toHaveText('All');
    }
    if (await this.isElementVisible(classroomDropdownSelector)) {
      const classroomValue = this.page.locator(
        `${classroomDropdownSelector} .mat-select-min-line`
      );
      await expect(classroomValue).toHaveText('Classrooms');
    }
    if (await this.isElementVisible(skillStatusDropdownSelector)) {
      const skillStatusValue = this.page.locator(
        `${skillStatusDropdownSelector} .mat-select-value-text`
      );
      await expect(skillStatusValue).toHaveText('All');
    }
  }

  /**
   * Sorts topics by a given option.
   */
  async sortTopics(
    sortOption:
      | 'Least Recently Updated'
      | 'Most Recently Updated'
      | 'Newly Created'
      | 'Oldest Created'
  ): Promise<void> {
    await this.navigateToTopicsAndSkillsDashboardPage();
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(displayMobileFiltersButton);
    }
    await this.expectElementToBeVisible(sortDropdownSelector);
    await this.selectMatOptionUsingSelector(
      sortDropdownSelector,
      sortOption,
      false
    );

    const dropdownValue = this.page.locator(
      `${sortDropdownSelector} .mat-select-value-text`
    );
    await expect(dropdownValue).toHaveText(sortOption);

    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(closeMobileFiltersButton);
    }
    showMessage(`Sorted topics by: ${sortOption}`);
  }

  /**
   * Checks if the topics are in the expected order.
   */
  async expectFilteredTopicsInOrder(expectedOrder: string[]): Promise<void> {
    const topicNameSelector = this.isViewportAtMobileWidth()
      ? mobileTopicSelector
      : desktopTopicSelector;

    await this.waitForStaticAssetsToLoad();
    await this.expectElementToBeVisible(topicNameSelector);

    const topicElements = this.page.locator(topicNameSelector);
    const count = await topicElements.count();
    const topicNames: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await topicElements.nth(i).textContent())?.trim();
      if (text) {
        topicNames.push(text);
      }
    }

    if (!topicNames.every((name, index) => name === expectedOrder[index])) {
      throw new Error(
        'Topics are not in the expected order.\n' +
          `Expected topics: "${expectedOrder.join('", "')}"\n` +
          `Found topics: "${topicNames.join('", "')}"`
      );
    }
    showMessage('Topics are in the expected order.');
  }

  /**
   * Filters topics by keyword.
   */
  async filterTopicsByKeyword(keyword: string): Promise<void> {
    await this.navigateToTopicsAndSkillsDashboardPage();
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(displayMobileFiltersButton);
    }
    await this.expectElementToBeVisible(keywordDropdownSelector);
    await this.clickOnElementWithSelector(keywordDropdownSelector);
    await this.expectElementToBeVisible(multiSelectionInputSelector);
    await this.typeInInputField(multiSelectionInputSelector, keyword);
    await this.page.keyboard.press('Enter');

    const chip = this.page.locator(multiSelectionInputChipSelector);
    await expect(chip).toHaveText(`${keyword} cancel`);

    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(closeMobileFiltersButton);
    }
    showMessage(`Filtered topics by keyword: ${keyword}`);
  }

  /**
   * Navigates to the skills tab in topics and skills dashboard.
   */
  async navigateToSkillsTab(): Promise<void> {
    await this.expectElementToBeVisible(skillsTab);
    await this.clickOnElementWithSelector(skillsTab);
    await this.waitForNetworkIdle();
  }

  /**
   * Expects the keywords selected in the keyword filter to match the given list.
   */
  async expectKeywordsSelectedToBe(keywords: string[]): Promise<void> {
    if (keywords.length === 0) {
      await this.expectElementToBeVisible(
        multiSelectionInputChipSelector,
        false
      );
      return;
    }

    const chips = this.page.locator(multiSelectionInputChipSelector);
    const count = await chips.count();
    expect(count).toBe(keywords.length);

    const keywordChips: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await chips.nth(i).textContent())?.trim();
      if (text) {
        keywordChips.push(text);
      }
    }

    const missedKeywords = keywords.filter(
      keyword => !keywordChips.includes(`${keyword} cancel`)
    );

    if (missedKeywords.length > 0) {
      throw new Error(
        `Keywords ${missedKeywords.join(', ')} were not found in the multi-selection input.\n` +
          `Keywords found: ${keywordChips.join(', ')}`
      );
    }
  }

  /**
   * Filters skills by status.
   */
  async filterSkillsByStatus(status: string): Promise<void> {
    await this.navigateToTopicsAndSkillsDashboardPage();
    await this.navigateToSkillsTab();
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(displayMobileFiltersButton);
    }
    await this.expectElementToBeVisible(skillStatusDropdownSelector);
    await this.selectMatOptionUsingSelector(
      skillStatusDropdownSelector,
      status
    );

    const dropdownValue = this.page.locator(
      `${skillStatusDropdownSelector} .mat-select-value-text`
    );
    await expect(dropdownValue).toHaveText(status);

    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(closeMobileFiltersButton);
    }
    showMessage(`Filtered skill by status: ${status}`);
  }

  /**
   * Expects the filtered skills to match the provided list (doesn't check exclusively).
   * @param expectedSkills {string[]} List of skills that should be checked for.
   * @param visible {Boolean} If skills should be visible or hidden.
   */
  async expectFilteredSkills(
    expectedSkills: string[],
    visible: boolean = true
  ): Promise<void> {
    const skillNameSelector = this.isViewportAtMobileWidth()
      ? mobileSkillSelector
      : desktopSkillSelector;

    await this.waitForStaticAssetsToLoad();

    const skillElements = this.page.locator(skillNameSelector);
    await this.waitForNetworkIdle();

    await expect
      .poll(
        async () => {
          const foundSkills = (await skillElements.allTextContents())
            .map(text => text.trim())
            .filter(Boolean);

          for (const skill of expectedSkills) {
            if (visible) {
              expect(foundSkills).toContain(skill);
            } else {
              expect(foundSkills).not.toContain(skill);
            }
          }

          return true;
        },
        {timeout: 5000}
      )
      .toBe(true);

    showMessage('Filtered skills match the expected skills.');
  }

  /**
   * Expects the skills to be in a certain order.
   */
  async expectFilteredSkillsInOrder(expectedOrder: string[]): Promise<void> {
    const skillNameSelector = this.isViewportAtMobileWidth()
      ? mobileSkillSelector
      : desktopSkillSelector;

    await this.waitForStaticAssetsToLoad();
    await this.expectElementToBeVisible(skillNameSelector);

    const skillElements = this.page.locator(skillNameSelector);
    const count = await skillElements.count();
    const skillNames: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await skillElements.nth(i).textContent())?.trim();
      if (text) {
        skillNames.push(text);
      }
    }

    if (!skillNames.every((name, index) => name === expectedOrder[index])) {
      throw new Error(
        'Skills are not in the expected order.\n' +
          `Expected skills: "${expectedOrder.join('", "')}"\n` +
          `Found skills: "${skillNames.join('", "')}"`
      );
    }
    showMessage('Skills are in the expected order.');
  }

  /**
   * Filters skills by keyword.
   */
  async filterSkillsByKeyword(keyword: string): Promise<void> {
    await this.navigateToTopicsAndSkillsDashboardPage();
    await this.navigateToSkillsTab();
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(displayMobileFiltersButton);
    }
    await this.expectElementToBeVisible(keywordDropdownSelector);
    await this.clickOnElementWithSelector(keywordDropdownSelector);
    await this.expectElementToBeVisible(multiSelectionInputSelector);
    await this.typeInInputField(multiSelectionInputSelector, keyword);
    await this.page.keyboard.press('Enter');

    const chip = this.page.locator(multiSelectionInputChipSelector);
    await expect(chip).toHaveText(`${keyword} cancel`);

    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(closeMobileFiltersButton);
    }
    showMessage(`Filtered skills by keyword: ${keyword}`);
  }

  /**
   * Navigate to the topic and skills dashboard page.
   */
  async navigateToTopicAndSkillsDashboardPage(): Promise<void> {
    await this.waitForNetworkIdle();
    await this.goto(topicsAndSkillsDashboardUrl);
  }

  /**
   * Sorts skills by a given option.
   * @param {string} currentSort Current sort method used to find select element
   * @param {string} newSort New sort method to choose.
   */
  async changeSkillSort(currentSort: string, newSort: string): Promise<void> {
    await this.navigateToTopicAndSkillsDashboardPage();
    await this.navigateToSkillsTab();
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(displayMobileFiltersButton);
    }

    await this.changeMatSelectOption(currentSort, newSort);
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(closeMobileFiltersButton);
    }
    showMessage(`Sorted skills by "${newSort}"`);
  }

  /**
   * Navigates to a tab in the topic editor page.
   */
  async navigateToTabInTopicEditorPage(
    tabName: 'Preview Tab' | 'Questions Tab'
  ): Promise<void> {
    const lowerCaseTabName = tabName.toLocaleLowerCase().replace(' ', '-');
    if (this.isViewportAtMobileWidth()) {
      if (!(await this.isElementVisible(mobileNavbarDropdown))) {
        await this.clickOnElementWithSelector(mobileOptionsSelector);
      }
      await this.clickOnElementWithSelector(mobileNavbarDropdown);
      await this.clickOnElementWithSelector(
        `.e2e-test-mobile-${lowerCaseTabName}`
      );
    } else {
      const tabSelector = `.e2e-test-${lowerCaseTabName}-button`;
      await this.expectElementToBeVisible(tabSelector);
      await this.clickOnElementWithSelector(tabSelector);
    }

    const questionTabContainerSelector = `.e2e-test-topic-${lowerCaseTabName}-container`;
    await this.expectElementToBeVisible(questionTabContainerSelector);
  }

  /**
   * Selects a skill in the questions tab.
   */
  async selectSkillInQuestionsTab(skillName: string): Promise<void> {
    await this.expectElementToBeVisible(skillSelectInQuestionTabSelector);
    await this.clickOnElementWithSelector(skillSelectInQuestionTabSelector);

    const option = this.page.locator('mat-option', {hasText: skillName});
    await option.waitFor({state: 'visible'});
    await option.click();

    const selectValue = this.page.locator(skillSelectInQuestionTabSelector);
    await expect(selectValue).toHaveText(skillName);
  }

  /**
   * Expects a question to be visible.
   */
  async expectQuestionToBeVisible(question: string): Promise<void> {
    const questionTextElement = this.page
      .locator(questionTextSelector, {
        hasText: question,
      })
      .first();
    await questionTextElement.waitFor({state: 'visible'});
    showMessage(`Question ${question} is visible.`);
  }

  /**
   * Clicks on the add question button.
   */
  async clickOnAddQuestionButton(): Promise<void> {
    await this.expectElementToBeVisible(addQuestionButtonSelector);
    await this.clickOnElementWithSelector(addQuestionButtonSelector);
    await this.expectElementToBeVisible(addQuestionButtonSelector, false);
  }

  /**
   * Saves a question.
   */
  async saveQuestion(): Promise<void> {
    await this.clickOnElementWithSelector(saveQuestionButton);
    await this.expectElementToBeVisible(saveQuestionButton, false);
  }

  /**
   * Checks if the stories list contains the given story.
   * @param {string} story - The story to check.
   * @returns {Promise<ElementHandle<Element> | null>} The story row element.
   */
  async expectStoriesListToContain(
    story: string,
    visible: boolean = true
  ): Promise<ElementHandle<Element> | null> {
    // Expand stories view in mobile.
    if (
      this.isViewportAtMobileWidth() &&
      !(await this.isElementVisible(addNewStoryButtonSelector))
    ) {
      await this.clickOnElementWithSelector(expandStoryHeaderSelector);
    }

    const storyListVisible = await this.isElementVisible(storyRowSelector);
    if (!storyListVisible) {
      // If we expected the stories list to be visible, but it was not, then
      // throw an error.
      if (visible) {
        throw new Error('Stories list is not visible');
      }
      // If we expected the stories list to be not visible, and it wasn't, then
      // return null.
      showMessage('Stories list is not visible as expected.');
      return null;
    }

    const storyRows = await this.page.$$(storyRowSelector);

    let foundStoryRow: ElementHandle<Element> | null = null;
    for (const storyRow of storyRows) {
      const storyRowText = await storyRow.$eval('td', el =>
        el.textContent?.trim()
      );
      if (storyRowText === story) {
        foundStoryRow = storyRow;
        break;
      }
    }

    if (!foundStoryRow) {
      if (visible) {
        throw new Error(`Story ${story} not found`);
      } else {
        showMessage(`Story ${story} is not found as expected.`);
        return null;
      }
    }

    if (visible) {
      showMessage(`Story ${story} is found as expected.`);
      return foundStoryRow;
    } else {
      throw new Error(`Story ${story} is found but it shouldn't be.`);
    }
  }

  /**
   * Deletes a story from the stories list.
   * @param {string} storyName - The name of the story to delete.
   */
  async deleteStory(storyName: string): Promise<void> {
    const storyRow = await this.expectStoriesListToContain(storyName);
    if (!storyRow) {
      throw new Error(`Story ${storyName} not found in stories list.`);
    }

    const deleteButton = await storyRow.waitForSelector(
      deleteStoryButtonSelector
    );
    if (!deleteButton) {
      throw new Error('Delete button not found');
    }

    await this.clickOnElement(deleteButton);
    await this.clickOnElementWithText('Delete Story');
  }

  /**
   * Checks if the stories list is empty.
   */
  async expectStoriesListToBeEmpty(): Promise<void> {
    await this.expectElementToBeVisible(storyRowSelector, false);
  }

  /**
   * Edits the details of a story.
   * @param {string} title - The new title of the story.
   * @param {string} description - The new description of the story.
   * @param {string} metaTag - The new meta tag of the story.
   * @param {string} urlFragment - The new URL fragment of the story.
   */
  async editStoryDetails(
    title: string,
    description: string,
    metaTag: string,
    urlFragment: string
  ): Promise<void> {
    // Title.
    await this.clearAllTextFrom(storyTitleInStoryEditorSelector);
    await this.typeInInputField(storyTitleInStoryEditorSelector, title);
    await this.expectElementValueToBe(storyTitleInStoryEditorSelector, title);

    // Description.
    await this.clearAllTextFrom(storyDescriptionInStoryEditorSelector);
    await this.typeInInputField(
      storyDescriptionInStoryEditorSelector,
      description
    );
    await this.expectElementValueToBe(
      storyDescriptionInStoryEditorSelector,
      description
    );

    // Meta Tag.
    await this.clearAllTextFrom(storyMetaTagContentInStoryEditorSelector);
    await this.typeInInputField(
      storyMetaTagContentInStoryEditorSelector,
      metaTag
    );
    await this.expectElementValueToBe(
      storyMetaTagContentInStoryEditorSelector,
      metaTag
    );

    // URL Fragment.
    await this.clearAllTextFrom(storyUrlFragmentInStoryEditorSelector);
    await this.typeInInputField(
      storyUrlFragmentInStoryEditorSelector,
      urlFragment
    );
    await this.expectElementValueToBe(
      storyUrlFragmentInStoryEditorSelector,
      urlFragment
    );
  }

  /**
   * Checks if the preview card is visible.
   * @param {string} title - The title of the card.
   * @param {string} description - The description of the card.
   */
  async expectPreviewCardToBeVisible(
    title?: string,
    description?: string
  ): Promise<void> {
    await this.expectElementToBeVisible(chapterPreviewContainerSelector);

    if (title) {
      await this.expectTextContentToBe(thumbnailTitleSelector, title);
    }

    if (description) {
      await this.expectTextContentToBe(
        thumbnailDescriptionSelector,
        description
      );
    }
  }

  /**
   * Opens the story editor for a given story and topic.
   * @param {string} storyName - The name of the story.
   * @param {string} topicName - The name of the topic.
   */
  async openStoryEditor(storyName: string, topicName?: string): Promise<void> {
    // If topic name is given, navigate to topic.
    if (topicName) {
      await this.openTopicEditor(topicName);
    }

    try {
      if (this.isViewportAtMobileWidth()) {
        const storyListVisible = await this.isElementVisible(
          storyTitleSelector,
          true,
          2000
        );
        if (!storyListVisible) {
          await this.expectElementToBeVisible(
            mobileCollapsibleCardHeaderSelector
          );
          const elements = await this.page.$$(
            mobileCollapsibleCardHeaderSelector
          );
          if (elements.length < 4) {
            throw new Error('Not enough collapsible cards found');
          }
          // 4th collapsible card is for stories.
          await elements[3].click();
        }
      }

      await this.page.waitForSelector(storyTitleSelector);
      const storyTitles = await this.page.$$(storyTitleSelector);

      for (const titleElement of storyTitles) {
        const title = await this.page.evaluate(
          el => el.textContent.trim(),
          titleElement
        );

        if (title === storyName) {
          await titleElement.click();
          await this.page.waitForNavigation({
            waitUntil: 'networkidle',
          });

          await this.expectElementToBeVisible(storyEditorContainerSelector);
          return;
        }
      }

      throw new Error(
        `Story with name ${storyName} not found in topic ${topicName}.`
      );
    } catch (error) {
      const newError = new Error(
        `Failed to open story editor for story ${storyName} in topic ${topicName}: ${error}`
      );
      newError.stack = error.stack;
      throw newError;
    }
  }

  /**
   * Opens the chapter editor for a given chapter, story, and topic.
   * @param {string} chapterName - The name of the chapter.
   * @param {string} storyName - The name of the story.
   * @param {string} topicName - The name of the topic.
   */
  async openChapterEditor(
    chapterName: string,
    storyName?: string,
    topicName?: string
  ): Promise<void> {
    try {
      if (storyName) {
        if (!this.isViewportAtMobileWidth()) {
          await this.openStoryEditor(storyName, topicName);
        } else {
          // In mobile, stay within the current story editor flow whenever
          // possible to avoid reloading the topic editor between chapter edits.
          const currentStoryName = await this.getCurrentStoryNameInStoryFlow();
          const activeTab = await this.getStoryEditorActiveTab();

          if (
            currentStoryName === storyName &&
            activeTab === 'chapter_editor'
          ) {
            const currentChapterName =
              await this.getCurrentChapterNameInChapterEditor();
            if (currentChapterName === chapterName) {
              await this.expectElementToBeVisible(
                chapterEditorContainerSelector
              );
              return;
            }
            await this.returnToStoryEditorInMobile();
          } else if (
            currentStoryName !== storyName ||
            activeTab === 'other' ||
            activeTab === 'story_preview'
          ) {
            await this.openStoryEditor(storyName, topicName);
          } else {
            await this.expectElementToBeVisible(storyEditorContainerSelector);
          }
        }
      }

      await this.expectChapterListIsVisible();

      await this.page.waitForSelector(chapterTitleSelector, {timeout: 60000});
      const chapterTitles = await this.page.$$(chapterTitleSelector);
      const availableChapterNames: string[] = [];

      for (const titleElement of chapterTitles) {
        const title = await this.page.evaluate(
          el => el.textContent.trim(),
          titleElement
        );
        availableChapterNames.push(title);

        if (title === chapterName) {
          await this.page.waitForTimeout(500);
          await titleElement.evaluate(element =>
            element.scrollIntoView({block: 'center'})
          );
          await titleElement.evaluate(element =>
            (element as HTMLElement).click()
          );
          await this.waitForStaticAssetsToLoad();
          const editorVisible = await this.isElementVisible(
            chapterEditorContainerSelector,
            true,
            5000
          );
          if (!editorVisible) {
            const chapterContainerHandle = await titleElement.evaluateHandle(
              element =>
                element.closest('.story-node') ||
                element.closest('.story-editor-node')
            );
            const chapterContainer = chapterContainerHandle.asElement();
            if (chapterContainer) {
              await chapterContainer.evaluate(element =>
                (element as HTMLElement).click()
              );
              await this.waitForStaticAssetsToLoad();
            }
            await this.page.waitForSelector(chapterEditorContainerSelector, {
              visible: true,
              timeout: 60000,
            });
          }
          showMessage(`Chapter ${chapterName} opened in chapter editor.`);

          // Collapsing all the collapsible card of chapter editor in the mobile viewport.
          if (this.isViewportAtMobileWidth()) {
            await this.page.waitForSelector(
              mobileCollapsibleCardHeaderSelector
            );
            const elements = await this.page.$$(
              mobileCollapsibleCardHeaderSelector
            );
            if (elements.length < 5) {
              throw new Error('Not enough elements collapsible headers found,');
            }
            await elements[4].click();
            await elements[3].click();
            await elements[2].click();
            await elements[1].click();
          }
          return;
        }
      }

      throw new Error(
        `Chapter with name ${chapterName} not found in story ${storyName} and topic ${topicName}. Available chapters: ${availableChapterNames.join(', ')}`
      );
    } catch (error) {
      const newError = new Error(
        `Failed to open chapter editor for chapter ${chapterName} in story ${storyName} and topic ${topicName}: ${error}`
      );
      newError.stack = error.stack;
      throw newError;
    }
  }

  /**
   * Previews the chapter card.
   */
  async previewChapterCard(): Promise<void> {
    const elementHandle = await this.page.waitForSelector(
      showChapterPreviewButton
    );
    if (!elementHandle) {
      throw new Error('Chapter preview button not found');
    }
    await elementHandle.click();

    await this.expectElementToBeVisible(chapterPreviewContainerSelector);
  }

  /**
   * Create a chapter for a certain story.
   */
  async addChapterWithoutSaving(
    chapterName: string,
    explorationId: string,
    storyName: string,
    topicName: string
  ): Promise<void> {
    await this.openStoryEditor(storyName, topicName);

    if (this.isViewportAtMobileWidth()) {
      await this.waitForStaticAssetsToLoad();
      const addChapterButtonElement = await this.page.$(addChapterButton);
      if (!addChapterButtonElement) {
        await this.clickOnElementWithSelector(mobileChapterCollapsibleCard);
      }
    }
    await this.clickOnElementWithSelector(addChapterButton);
    await this.typeInInputField(newChapterTitleField, chapterName);
    await this.typeInInputField(newChapterExplorationIdField, explorationId);

    await this.clickOnElementWithSelector(newChapterPhotoBoxButton);
    await this.uploadFile(curriculumAdminThumbnailImage);
    await this.page.waitForSelector(`${uploadPhotoButton}:not([disabled])`);
    await this.clickOnElementWithSelector(uploadPhotoButton);

    await this.page.waitForSelector(photoUploadModal, {hidden: true});
  }

  /**
   * Expect create new chapter to have error
   */
  async expectNewChapterErrorSpan(errorSpan: string): Promise<void> {
    await this.page.waitForSelector(newChapterErrorMessageSelector);

    const errorSpanElement = await this.page.$(newChapterErrorMessageSelector);

    const errorMessage = await this.page.evaluate(
      el => el.textContent.trim(),
      errorSpanElement
    );

    if (!errorMessage.startsWith(errorSpan)) {
      showMessage(errorMessage);
      showMessage(errorSpan);
      throw new Error(
        `Expected error message to be ${errorSpan} but found ${errorMessage}`
      );
    }

    showMessage(`Found expected error message: ${errorMessage}`);
  }

  /**
   * Expects an exploration already present warning.
   */
  async expectExplorationIdAlreadyExistWarning(): Promise<void> {
    const explorationAlreadyPresentMsgSelector = '.e2e-test-invalid-exp-id';
    await this.expectElementToBeVisible(explorationAlreadyPresentMsgSelector);
    const actualWarning = await this.page.$eval(
      explorationAlreadyPresentMsgSelector,
      el => el.textContent?.trim()
    );

    const expectedWarning =
      'The given exploration already exists in the story.';
    if (actualWarning !== expectedWarning) {
      throw new Error(
        `Expected warning: "${expectedWarning}", but got: "${actualWarning}"`
      );
    }
  }

  /**
   * Discards the changes made in the story editor.
   */
  async discardStoryChanges(): Promise<void> {
    await this.waitForPageToFullyLoad();
    const discardToggle = await this.page.$(showDiscardOptionButtonSelector);
    if (!discardToggle) {
      throw new Error('Discard option button not found.');
    }
    const discardToggleDisabled = await discardToggle.evaluate(
      element => (element as HTMLButtonElement).disabled
    );
    if (discardToggleDisabled) {
      showMessage('Discard option disabled; no changes to discard.');
      return;
    }
    await this.clickOnElementWithJsFallback(showDiscardOptionButtonSelector);
    await this.clickOnElementWithJsFallback(discardStoryChangesButtonSelector);
    await this.waitForPageToFullyLoad();

    // Post-check: The save story button should be disabled after discarding changes.
    await this.expectSaveStoryButtonToBeDisabled();

    showMessage('Story changes discarded successfully.');
  }

  /**
   * Verifies the order of chapters in the story editor.
   * @param {string[]} expectedOrder - The expected order of chapter titles.
   */
  async expectChaptersOrderToBe(expectedOrder: string[]): Promise<void> {
    await this.expectChapterListIsVisible();
    const chapterTitles = await this.getCurrentChapterTitles();

    if (chapterTitles.length !== expectedOrder.length) {
      throw new Error(
        `Expected ${expectedOrder.length} chapters, but found ${chapterTitles.length}. Current chapters: ${chapterTitles.join(', ')}`
      );
    }

    for (let i = 0; i < chapterTitles.length; i++) {
      if (chapterTitles[i] !== expectedOrder[i]) {
        throw new Error(
          `Expected chapter at index ${i} to be "${expectedOrder[i]}", but got "${chapterTitles[i]}"`
        );
      }
    }
  }

  /**
   * Reorders chapters by dragging one chapter before another.
   * @param chapterName - Name of the chapter to drag.
   * @param targetChapterName - Name of the chapter to drop before.
   */
  async reorderChapters(
    chapterName: string,
    targetChapterName: string
  ): Promise<void> {
    await this.expectChapterListIsVisible();

    const chapterTitles = await this.getCurrentChapterTitles();
    const chapterIndex = chapterTitles.indexOf(chapterName);
    const targetChapterIndex = chapterTitles.indexOf(targetChapterName);
    if (chapterIndex === -1 || targetChapterIndex === -1) {
      throw new Error(
        `Could not find chapter(s) "${chapterName}" or "${targetChapterName}". Current chapters: ${chapterTitles.join(', ')}`
      );
    }

    const destinationIndex =
      chapterIndex < targetChapterIndex
        ? targetChapterIndex - 1
        : targetChapterIndex;
    if (chapterIndex !== destinationIndex) {
      const moveDirection: 'up' | 'down' =
        chapterIndex > destinationIndex ? 'up' : 'down';
      const movesNeeded = Math.abs(chapterIndex - destinationIndex);

      let movedWithActionButtons = true;
      for (let i = 0; i < movesNeeded; i++) {
        const moved = await this.moveChapterWithActionButton(
          chapterName,
          moveDirection
        );
        if (!moved) {
          movedWithActionButtons = false;
          break;
        }
      }

      if (!movedWithActionButtons) {
        await this.reorderChapterUsingDragAndDrop(
          chapterName,
          targetChapterName
        );
      }
    }

    await this.page.waitForFunction(
      (
        selector: string,
        chapterToMove: string,
        targetChapter: string
      ): boolean => {
        const titles = Array.from(document.querySelectorAll(selector)).map(
          element => element.textContent?.trim() ?? ''
        );
        const movedChapterIndex = titles.indexOf(chapterToMove);
        const targetChapterIndex = titles.indexOf(targetChapter);
        return (
          movedChapterIndex !== -1 &&
          targetChapterIndex !== -1 &&
          movedChapterIndex < targetChapterIndex
        );
      },
      {timeout: 10000},
      chapterTitleSelector,
      chapterName,
      targetChapterName
    );

    const reorderedChapterTitles = await this.getCurrentChapterTitles();
    showMessage(
      `Reordered chapters: "${chapterName}" before "${targetChapterName}". Current order: ${reorderedChapterTitles.join(', ')}`
    );
    await this.waitForPageToFullyLoad();
  }

  /**
   * Ensures the given chapter is the initial node by moving the current
   * first chapter down until the target chapter is first.
   * This is required because the initial node only updates when the node at
   * index 0 is moved.
   */
  async ensureChapterIsInitial(chapterName: string): Promise<void> {
    await this.expectChapterListIsVisible();
    let chapterTitles = await this.getCurrentChapterTitles();
    if (!chapterTitles.includes(chapterName)) {
      throw new Error(
        `Chapter "${chapterName}" not found. Current chapters: ${chapterTitles.join(', ')}`
      );
    }

    let safetyCounter = chapterTitles.length + 1;
    while (chapterTitles[0] !== chapterName && safetyCounter > 0) {
      const currentFirst = chapterTitles[0];
      const moved = await this.moveChapterWithActionButton(
        currentFirst,
        'down'
      );
      if (!moved) {
        throw new Error(
          `Unable to set "${chapterName}" as initial chapter. Move controls not available for "${currentFirst}".`
        );
      }
      await this.waitForPageToFullyLoad();
      chapterTitles = await this.getCurrentChapterTitles();
      safetyCounter--;
    }

    if (chapterTitles[0] !== chapterName) {
      throw new Error(
        `Failed to set "${chapterName}" as initial chapter. Current order: ${chapterTitles.join(', ')}`
      );
    }
    showMessage(`Initial chapter set to "${chapterName}".`);
  }

  /**
   * Assigns an acquired skill.
   * @param {string} skillName - The name of the skill.
   * @returns {Promise<void>}
   */
  async addAcquiredSkill(skillName: string): Promise<void> {
    await this.expectElementToBeVisible(chapterEditorContainerSelector);
    await this.scrollToBottomOfPage();
    await this.waitForPageToFullyLoad();
    if (this.isViewportAtMobileWidth()) {
      await this.expectMobileAcquiredSkillsSectionIsVisible();
      await this.expectElementToBeVisible(
        mobileAcquiredSkillsSectionBodySelector
      );
      const mobileBody = await this.page.$(
        mobileAcquiredSkillsSectionBodySelector
      );
      if (!mobileBody) {
        throw new Error('Acquired Skills mobile section not found.');
      }
      const addButton = await mobileBody.$(addAcquiredSkillButton);
      if (!addButton) {
        throw new Error(
          'Add Acquired skill button not found in mobile section.'
        );
      }
      const isDisabled = await addButton.evaluate(
        element => (element as HTMLButtonElement).disabled
      );
      if (isDisabled) {
        await this.page.waitForFunction(
          (element: HTMLButtonElement) => !element.disabled,
          {timeout: 10000},
          addButton
        );
      }
      await addButton.evaluate(element => {
        element.scrollIntoView({block: 'center'});
        (element as HTMLElement).click();
      });
      await this.filterAndSelectSkillInSkillSelector(skillName);
      return;
    }

    await this.page.waitForSelector(addAcquiredSkillButton, {visible: true});
    const elements = await this.page.$$(addAcquiredSkillButton);
    const visibleElements: ElementHandle<Element>[] = [];
    for (const element of elements) {
      const box = await element.boundingBox();
      if (box) {
        visibleElements.push(element);
      }
    }
    if (!visibleElements.length) {
      throw new Error('Add Acquired skill button not found.');
    }

    let targetElement: ElementHandle<Element> | null = null;
    const isMobileViewport = this.isViewportAtMobileWidth();
    for (const element of visibleElements) {
      const inMobileSection = await element.evaluate(el =>
        Boolean(el.closest('.story-skill-mobile'))
      );
      if (isMobileViewport === inMobileSection) {
        targetElement = element;
        break;
      }
    }
    targetElement = targetElement ?? visibleElements[0];

    const isDisabled = await targetElement.evaluate(
      element => (element as HTMLButtonElement).disabled
    );
    if (isDisabled) {
      await this.page.waitForFunction(
        (element: HTMLButtonElement) => !element.disabled,
        {timeout: 10000},
        targetElement
      );
    }

    try {
      await this.clickOnElement(targetElement);
    } catch (error) {
      await targetElement.evaluate(element => {
        element.scrollIntoView({block: 'center'});
        (element as HTMLElement).click();
      });
    }
    await this.filterAndSelectSkillInSkillSelector(skillName);
  }

  /**
   * Edits the details of a chapter.
   * @param {string} chapterName - The name of the chapter.
   * @param {string} description - The description of the chapter.
   * @param {string} outline - The outline content for the chapter.
   * @param {string} thumbnailImage - The thumbnail image of the chapter.
   */
  async editChapterDetails(
    chapterName: string,
    description: string,
    outline: string,
    thumbnailImage: string
  ): Promise<void> {
    await this.clearAllTextFrom(chapterTitleField);
    await this.typeInInputField(chapterTitleField, chapterName);
    await this.typeInInputField(chapterDescriptionField, description);

    // Update outline.
    await this.page.waitForSelector(chapterOutlineEditorContainer);
    const outlineEditor = await this.page.$(
      `${chapterOutlineEditorContainer} ${rteSelector}`
    );
    if (outlineEditor) {
      await outlineEditor.click();
      await outlineEditor.type(outline);
      await this.clickOnElementWithSelector(nodeOutlineSaveButton);
    }

    await this.clickOnElementWithSelector(chapterPhotoBoxButton);
    await this.clickOnElementWithSelector(resetChapterThumbnailButton);
    await this.uploadFile(thumbnailImage);
    await this.page.waitForSelector(`${uploadPhotoButton}:not([disabled])`);
    await this.clickOnElementWithSelector(uploadPhotoButton);
    await this.expectElementToBeVisible(uploadPhotoButton, false);
  }

  /**
   * Adds a prerequisite skill to a chapter in chapter editor.
   * @param {string} skillName - The name of the skill to add.
   */
  async addPrerequisiteSkill(skillName: string): Promise<void> {
    if (this.isViewportAtMobileWidth()) {
      await this.expandHeaderInMobile('Prerequisite Skills');
    }

    const selector = this.isViewportAtMobileWidth()
      ? addPrerequisiteSkillMobileButtonSelector
      : addPrerequisiteSkillButton;
    await this.clickOnElementWithSelector(selector);
    await this.filterAndSelectSkillInSkillSelector(skillName);
  }

  /**
   * Checks if the prerequisite skill is visible.
   * @param {string} skillName - The name of the prerequisite skill.
   * @param {boolean} visible - Whether the skill should be visible.
   * @returns {Promise<ElementHandle<Element>|null>} The prerequisite skill element.
   */
  async expectPrerequisiteSkillToBeVisible(
    skillName: string,
    visible: boolean = true
  ): Promise<ElementHandle<Element> | null> {
    const selector = this.isViewportAtMobileWidth()
      ? prerequisiteSkillMobileSelector
      : prerequisiteSkillSelector;

    if (visible) {
      await this.expectElementToBeVisible(selector);
    }
    const prerequisiteSkillElements = await this.page.$$(selector);

    let prerequisiteSkillElement: ElementHandle<Element> | null = null;
    for (const prerequisiteSkill of prerequisiteSkillElements) {
      const prerequisiteSkillText = await prerequisiteSkill.evaluate(el =>
        el.textContent?.trim()
      );
      if (prerequisiteSkillText === skillName) {
        prerequisiteSkillElement = prerequisiteSkill;
        break;
      }
    }

    if (visible && !prerequisiteSkillElement) {
      throw new Error(`Prerequisite skill ${skillName} not found.`);
    }

    if (!visible && prerequisiteSkillElement) {
      throw new Error(
        `Prerequisite skill ${skillName} found but should not be.`
      );
    }

    showMessage(
      `Prerequisite skill ${skillName} is ${visible ? 'visible' : 'not visible'} as expected.`
    );
    return prerequisiteSkillElement;
  }

  /**
   * Closes the currently visible toast warning.
   */
  async closeToastMessage(): Promise<void> {
    const toastVisible = await this.isElementVisible(
      toastWarningContainerSelector,
      true,
      3000
    );
    if (!toastVisible) {
      showMessage('No toast warning is visible to close.');
      return;
    }

    await this.clickOnElementWithSelector(closeToastMessageButtonSelector);
    await this.expectElementToBeVisible(toastWarningContainerSelector, false);
  }

  /**
   * Removes a prerequisite skill from the chapter.
   * @param {string} skillName - The name of the skill to remove.
   */
  async removePrerequisiteSkillFromChapter(skillName: string): Promise<void> {
    const cardSelector = this.isViewportAtMobileWidth()
      ? prerequisiteSkillMobileSelector
      : prerequisiteSkillSelector;
    await this.page.waitForSelector(cardSelector);
    const skillCards = await this.page.$$(cardSelector);

    for (const skillCard of skillCards) {
      const skillText = await this.page.evaluate(
        el => el.querySelector('a')?.textContent?.trim(),
        skillCard
      );

      if (skillText === skillName) {
        const removeButton = await skillCard.$(
          removePrerequisiteSkillButtonSelector
        );
        if (removeButton) {
          await removeButton.evaluate(element => {
            element.scrollIntoView({block: 'center'});
            (element as HTMLElement).click();
          });
          await this.page.waitForFunction(
            (selector: string, targetSkill: string) => {
              const cards = Array.from(document.querySelectorAll(selector));
              return !cards.some(card => {
                const link = card.querySelector('a');
                return link?.textContent?.trim() === targetSkill;
              });
            },
            {timeout: 10000},
            cardSelector,
            skillName
          );
          await this.waitForPageToFullyLoad();
          showMessage(`Removed prerequisite skill: ${skillName}`);
          return;
        }
      }
    }
    throw new Error(`The prerequisite skill ${skillName} was not found.`);
  }

  /**
   * Checks if the aquired skill is visible.
   * @param {string} skillName - The name of the aquired skill.
   * @param {boolean} visible - Whether the skill should be visible.
   * @returns {Promise<ElementHandle<Element>|null>} The aquired skill element.
   */
  async expectAquiredSkillToBeVisible(
    skillName: string,
    visible: boolean = true
  ): Promise<ElementHandle<Element> | null> {
    const selector = this.isViewportAtMobileWidth()
      ? aquiredSkillSkillMobileSelector
      : aquiredSkillSkillSelector;

    if (visible) {
      await this.expectElementToBeVisible(selector);
    }
    const aquiredSkillElements = await this.page.$$(selector);

    let aquiredSkillElement: ElementHandle<Element> | null = null;
    for (const aquiredSkill of aquiredSkillElements) {
      const aquiredSkillText = await aquiredSkill.evaluate(el =>
        el.textContent?.trim()
      );
      if (aquiredSkillText === skillName) {
        aquiredSkillElement = aquiredSkill;
        break;
      }
    }

    if (visible && !aquiredSkillElement) {
      throw new Error(`Aquired skill ${skillName} not found.`);
    }

    if (!visible && aquiredSkillElement) {
      throw new Error(`Aquired skill ${skillName} found but should not be.`);
    }

    showMessage(
      `Aquired skill ${skillName} is ${visible ? 'visible' : 'not visible'} as expected.`
    );
    return aquiredSkillElement;
  }

  /**
   * Expects a warning message to appear in the chapter editor.
   * @param {string|RegExp} expectedWarning - The expected warning message or regex.
   */
  async expectWarningInIndicator(
    expectedWarning: string | RegExp
  ): Promise<void> {
    const requireVisible = !this.isViewportAtMobileWidth();
    const warningIndicator = await this.page.waitForSelector(
      warningIndicatorSelector,
      requireVisible ? {visible: true} : undefined
    );
    if (!warningIndicator) {
      throw new Error('Warning indicator not found.');
    }
    const warningContainerHandle = await warningIndicator.evaluateHandle(el =>
      el.closest('.oppia-editor-warnings-indicator')
    );
    const warningContainer = warningContainerHandle.asElement();
    if (warningContainer) {
      await warningContainer.evaluate(element => {
        element.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
      });
    } else {
      await this.page.hover(warningIndicatorSelector);
    }

    const waitForWarningText = async (): Promise<boolean> => {
      if (requireVisible) {
        return await this.isElementVisible(warningTextSelector, true, 2000);
      }
      try {
        await this.page.waitForSelector(warningTextSelector, {timeout: 2000});
        return true;
      } catch {
        return false;
      }
    };

    let warningVisible = await waitForWarningText();
    if (!warningVisible) {
      await this.clickOnElementWithJsFallback(warningIndicatorSelector);
      warningVisible = await waitForWarningText();
    }
    if (!warningVisible) {
      const warnings = await this.page.$$eval(warningTextSelector, elements =>
        elements
          .map(element => element.textContent?.trim() || '')
          .filter(text => text.length > 0)
      );
      throw new Error(
        `Warning text did not appear. Found warnings: ${
          warnings.length ? warnings.join(' | ') : 'none'
        }`
      );
    }

    const actualWarning = await this.page.$eval(warningTextSelector, el =>
      el.textContent?.trim()
    );

    if (typeof expectedWarning === 'string') {
      if (actualWarning !== expectedWarning) {
        throw new Error(
          `Expected warning: "${expectedWarning}", but got: "${actualWarning}"`
        );
      }
    } else {
      if (!expectedWarning.test(actualWarning || '')) {
        throw new Error(
          `Expected warning to match: ${expectedWarning}, but got: "${actualWarning}"`
        );
      }
    }
  }

  /**
   * Removes an acquired skill from the chapter.
   * @param {string} skillName - The name of the skill to remove.
   */
  async removeAcquiredSkill(skillName: string): Promise<void> {
    if (this.isViewportAtMobileWidth()) {
      await this.expectMobileAcquiredSkillsSectionIsVisible();
    }
    const cardSelector = this.isViewportAtMobileWidth()
      ? aquiredSkillSkillMobileSelector
      : aquiredSkillSkillSelector;
    await this.page.waitForSelector(cardSelector);
    const skillCards = await this.page.$$(cardSelector);

    const waitForSkillRemoval = async (timeout: number): Promise<boolean> => {
      try {
        await this.page.waitForFunction(
          (selector: string, targetSkill: string) => {
            const cards = Array.from(document.querySelectorAll(selector));
            return !cards.some(card => {
              const link = card.querySelector('a');
              return link?.textContent?.trim() === targetSkill;
            });
          },
          {timeout},
          cardSelector,
          skillName
        );
        return true;
      } catch {
        return false;
      }
    };

    for (const skillCard of skillCards) {
      const skillText = await this.page.evaluate(
        el => el.querySelector('a')?.textContent?.trim(),
        skillCard
      );

      if (skillText === skillName) {
        const removeButton = await skillCard.$(
          removeAcquiredSkillButtonSelector
        );
        if (removeButton) {
          await removeButton.evaluate(element => {
            element.scrollIntoView({block: 'center'});
            (element as HTMLElement).click();
          });
          let removed = await waitForSkillRemoval(10000);
          if (!removed) {
            await this.waitForPageToFullyLoad();
            const retryCards = await this.page.$$(cardSelector);
            for (const retryCard of retryCards) {
              const retrySkillText = await this.page.evaluate(
                el => el.querySelector('a')?.textContent?.trim(),
                retryCard
              );
              if (retrySkillText === skillName) {
                const retryRemoveButton = await retryCard.$(
                  removeAcquiredSkillButtonSelector
                );
                if (retryRemoveButton) {
                  await retryRemoveButton.evaluate(element => {
                    element.scrollIntoView({block: 'center'});
                    (element as HTMLElement).click();
                  });
                  removed = await waitForSkillRemoval(8000);
                }
                break;
              }
            }
          }
          if (!removed) {
            const currentSkills = await this.page.$$eval(
              cardSelector,
              elements =>
                elements
                  .map(
                    element =>
                      element.querySelector('a')?.textContent?.trim() || ''
                  )
                  .filter(text => text.length > 0)
            );
            throw new Error(
              `Failed to remove acquired skill ${skillName}. Current acquired skills: ${currentSkills.join(
                ', '
              )}`
            );
          }
          await this.waitForPageToFullyLoad();
          showMessage(`Removed acquired skill: ${skillName}`);
          return;
        }
      }
    }
    throw new Error(`The acquired skill ${skillName} was not found.`);
  }

  /**
   * Clicks an element using the normal click flow, with a JS click fallback
   * for controls that can be obscured in the story editor mobile UI.
   * @param {string} selector - The CSS selector for the element to click.
   */
  async clickOnElementWithJsFallback(selector: string): Promise<void> {
    const elements = await this.page.$$(selector);
    if (!elements.length) {
      throw new Error(`Element not found for selector ${selector}`);
    }

    let targetElement: ElementHandle<Element> | null = null;
    for (const element of elements) {
      const box = await element.boundingBox();
      if (!box) {
        continue;
      }
      const isDisabled = await element.evaluate(el =>
        Boolean((el as HTMLButtonElement).disabled)
      );
      if (isDisabled) {
        continue;
      }
      targetElement = element;
      break;
    }

    if (!targetElement) {
      for (const element of elements) {
        const box = await element.boundingBox();
        if (box) {
          targetElement = element;
          break;
        }
      }
    }

    targetElement = targetElement ?? elements[0];

    try {
      await this.clickOnElement(targetElement);
    } catch {
      await targetElement.evaluate(el => {
        el.scrollIntoView({block: 'center'});
        (el as HTMLElement).click();
      });
    }
  }

  /**
   * Expands the given header in the mobile viewport.
   * @param {string} header - The header to expand.
   */
  async expandHeaderInMobile(
    header: 'Prerequisite Skills' | 'Acquired Skills'
  ): Promise<void> {
    if (!this.isViewportAtMobileWidth()) {
      showMessage('Skipping test as the viewport is not mobile');
      return;
    }

    const simplifiedHeader = header.replace(' ', '-').toLowerCase();
    const headerSelector = `.e2e-test-section-header-${simplifiedHeader}`;
    const bodySelector = `.e2e-test-section-body-${simplifiedHeader}`;

    if (await this.isElementVisible(bodySelector, true, 10000)) {
      showMessage(`Skipping test as the ${header} section is already expanded`);
      return;
    }

    await this.expectElementToBeVisible(headerSelector);
    await this.clickOnElementWithSelector(headerSelector);

    await this.expectElementToBeVisible(bodySelector);
  }

  /**
   * Ensures the chapter list is visible in story editor.
   */
  async expectChapterListIsVisible(): Promise<void> {
    if (this.isViewportAtMobileWidth()) {
      const chapterListVisible = await this.isElementVisible(
        chapterTitleSelector,
        true,
        1000
      );
      if (chapterListVisible) {
        return;
      }
      const addChapterButtonElement = await this.page.$(addChapterButton);
      if (!addChapterButtonElement) {
        await this.clickOnElementWithSelector(mobileChapterCollapsibleCard);
      }
    }
    await this.page.waitForSelector(chapterTitleSelector, {
      visible: true,
      timeout: 60000,
    });
  }

  /**
   * Ensures the acquired skills section is expanded in mobile viewport.
   */
  async expectMobileAcquiredSkillsSectionIsVisible(): Promise<void> {
    if (!this.isViewportAtMobileWidth()) {
      return;
    }

    const isVisible = await this.isElementVisible(
      mobileAcquiredSkillsSectionBodySelector,
      true,
      1000
    );
    if (isVisible) {
      return;
    }

    await this.expandHeaderInMobile('Acquired Skills');
    await this.expectElementToBeVisible(
      mobileAcquiredSkillsSectionBodySelector
    );
  }

  async expectSaveStoryButtonToBeDisabled(): Promise<void> {
    if (this.isViewportAtMobileWidth()) {
      const isMobileSaveButtonVisible = await this.isElementVisible(
        mobileSaveStoryChangesButton
      );
      if (!isMobileSaveButtonVisible) {
        await this.clickOnElementWithSelector(mobileOptionsSelector);
      }
    }
    await this.page.waitForFunction(
      (selector: string) => {
        const element = document.querySelector(selector);
        return (element as HTMLButtonElement)?.disabled === true;
      },
      {},
      this.isViewportAtMobileWidth()
        ? mobileSaveStoryChangesButton
        : saveStoryButton
    );
  }

  /**
   * Checks if the skill is visible in the skill selection modal.
   * @param skillName The name of the skill.
   * @param visible Whether the skill should be visible or not.
   */
  async expectSkillInSkillSelectionModalToBeVisible(
    skillName: string,
    visible: boolean = true
  ): Promise<ElementHandle | null> {
    await this.waitForPageToFullyLoad();
    await this.expectElementToBeVisible(skillSelectionModalSelector);
    const skillVisible = await this.isElementVisible(
      skillSelectionItemSelector
    );
    if (!skillVisible) {
      if (visible) {
        throw new Error(
          `Skill ${skillName} is not visible in the skill selection modal.`
        );
      } else {
        showMessage(
          `Skill ${skillName} is not visible in the skill selection modal.`
        );
        return null;
      }
    }

    const skillElements = await this.page.$$(skillSelectionItemSelector);
    for (const skillElement of skillElements) {
      const foundSkillName = await this.page.evaluate(
        (skillElement: Element) => skillElement.textContent?.trim(),
        skillElement
      );
      if (skillName === foundSkillName) {
        if (visible) {
          return skillElement;
        } else {
          throw new Error(
            `Skill ${skillName} is visible in the skill selection modal.`
          );
        }
      }
    }

    if (visible) {
      throw new Error(
        `Skill ${skillName} is not visible in the skill selection modal.`
      );
    } else {
      showMessage(
        `Skill ${skillName} is not visible in the skill selection modal.`
      );
      return null;
    }
  }

  /**
   * Fills the skill name input field with the given skill name.
   * @param {string} skillName - The skill name to fill the input field with.
   */
  async fillSkillNameInSkillSelectionModal(skillName: string): Promise<void> {
    await this.expectElementToBeVisible(skillNameInputSelector);
    await this.typeInInputField(skillNameInputSelector, skillName);
    await this.expectElementValueToBe(skillNameInputSelector, skillName);
  }

  /**
   * Filters skills by name and selects the first matching skill.
   *
   * @param {string} skillName - The name of the skill to select.
   */
  async filterAndSelectSkillInSkillSelector(skillName: string): Promise<void> {
    // Searching by skill name.
    await this.fillSkillNameInSkillSelectionModal(skillName);
    await this.selectSkillAndClickOnDoneInSkillSelectionModal(skillName);
  }

  /**
   * Gets the chapter title shown in chapter editor.
   */
  async getCurrentChapterNameInChapterEditor(): Promise<string | null> {
    const element = await this.page.$(
      chapterEditorBreadcrumbChapterNameSelector
    );
    if (!element) {
      return null;
    }

    const text = await this.page.evaluate(
      (el: Element) => el.textContent?.trim() ?? '',
      element
    );
    return text || null;
  }

  /**
   * Gets chapter titles in their current order.
   */
  async getCurrentChapterTitles(): Promise<string[]> {
    await this.page.waitForSelector(chapterTitleSelector, {
      visible: true,
    });
    return await this.page.$$eval(chapterTitleSelector, elements =>
      elements
        .map(element => element.textContent?.trim() || '')
        .filter(title => title.length > 0)
    );
  }

  /**
   * Gets the story title shown in the current story/chapter editor flow.
   */
  async getCurrentStoryNameInStoryFlow(): Promise<string | null> {
    const selectors = [
      chapterEditorBreadcrumbStoryNameSelector,
      storyEditorBreadcrumbStoryNameSelector,
    ];

    for (const selector of selectors) {
      const element = await this.page.$(selector);
      if (!element) {
        continue;
      }

      const text = await this.page.evaluate(
        (el: Element) => el.textContent?.trim() ?? '',
        element
      );
      const normalizedText = text.replace(/\/$/, '').trim();
      if (normalizedText) {
        return normalizedText;
      }
    }

    return null;
  }

  /**
   * Gets the active tab in the story editor flow from the current hash.
   */
  async getStoryEditorActiveTab(): Promise<
    'story_editor' | 'chapter_editor' | 'story_preview' | 'other'
  > {
    const currentUrl = this.page.url();
    if (!currentUrl.includes('/story_editor/')) {
      return 'other';
    }

    const hash = await this.page.evaluate(() => window.location.hash || '');
    const normalizedHash = hash.startsWith('#') ? hash.slice(1) : hash;

    if (normalizedHash.startsWith('/chapter_editor/')) {
      return 'chapter_editor';
    }
    if (normalizedHash.startsWith('/story_preview/')) {
      return 'story_preview';
    }
    return 'story_editor';
  }

  /**
   * Moves a chapter in story editor using chapter action buttons.
   * Returns false when move controls are not available and caller should
   * fall back to drag and drop.
   * @param {string} chapterName - The name of the chapter to move.
   * @param {'up' | 'down'} direction - The direction to move the chapter.
   */
  async moveChapterWithActionButton(
    chapterName: string,
    direction: 'up' | 'down'
  ): Promise<boolean> {
    await this.page.waitForSelector(chapterTitleSelector, {
      visible: true,
    });
    const chapterTitleElements = await this.page.$$(chapterTitleSelector);

    for (const chapterTitleElement of chapterTitleElements) {
      const title = await this.page.evaluate(
        element => element.textContent?.trim() ?? '',
        chapterTitleElement
      );
      if (title !== chapterName) {
        continue;
      }

      const chapterContainerHandle = await chapterTitleElement.evaluateHandle(
        el =>
          el.closest('.story-node') ||
          el.closest('.story-editor-node') ||
          el.closest('[cdkDrag]')
      );
      const chapterContainer = chapterContainerHandle.asElement();
      if (!chapterContainer) {
        return false;
      }
      const editOptionsButton = await chapterContainer.$(editOptionsSelector);
      if (!editOptionsButton) {
        return false;
      }
      await this.clickOnElement(editOptionsButton);

      const moveButtonSelector =
        direction === 'up'
          ? moveChapterUpButtonSelector
          : moveChapterDownButtonSelector;
      const moveButton = await chapterContainer
        .waitForSelector(moveButtonSelector, {timeout: 2000})
        .catch(() => null);
      if (!moveButton) {
        await this.page.keyboard.press('Escape');
        return false;
      }

      await this.clickOnElement(moveButton);
      await this.waitForPageToFullyLoad();
      return true;
    }

    throw new Error(
      `Chapter "${chapterName}" was not found while attempting to reorder chapters.`
    );
  }

  /**
   * Reorders chapters using drag and drop.
   * @param {string} chapterName - The name of the chapter to drag.
   * @param {string} targetChapterName - The name of the chapter to drop before.
   */
  async reorderChapterUsingDragAndDrop(
    chapterName: string,
    targetChapterName: string
  ): Promise<void> {
    const chapterTitleElements = await this.page.$$(chapterTitleSelector);

    let sourceChapterElement: ElementHandle<Element> | null = null;
    let targetChapterElement: ElementHandle<Element> | null = null;
    for (const chapterTitleElement of chapterTitleElements) {
      const title = await this.page.evaluate(
        element => element.textContent?.trim() ?? '',
        chapterTitleElement
      );
      if (title === chapterName) {
        const sourceChapterElementHandle =
          await chapterTitleElement.evaluateHandle(el =>
            el.closest('[cdkDrag]')
          );
        sourceChapterElement = sourceChapterElementHandle.asElement();
      }
      if (title === targetChapterName) {
        const targetChapterElementHandle =
          await chapterTitleElement.evaluateHandle(el =>
            el.closest('[cdkDrag]')
          );
        targetChapterElement = targetChapterElementHandle.asElement();
      }
    }

    if (!sourceChapterElement || !targetChapterElement) {
      throw new Error(
        `Could not find chapter(s) "${chapterName}" or "${targetChapterName}" for drag and drop.`
      );
    }

    await sourceChapterElement.evaluate(element =>
      element.scrollIntoView({block: 'center'})
    );
    await targetChapterElement.evaluate(element =>
      element.scrollIntoView({block: 'center'})
    );

    const sourceBoundingBox = await sourceChapterElement.boundingBox();
    const targetBoundingBox = await targetChapterElement.boundingBox();
    if (!sourceBoundingBox || !targetBoundingBox) {
      throw new Error(
        'Could not get bounding boxes for chapter drag and drop.'
      );
    }

    const sourceX = sourceBoundingBox.x + sourceBoundingBox.width / 2;
    const sourceY = sourceBoundingBox.y + sourceBoundingBox.height / 2;
    const targetX = targetBoundingBox.x + targetBoundingBox.width / 2;
    const targetY = targetBoundingBox.y + targetBoundingBox.height / 4;

    await this.page.mouse.move(sourceX, sourceY);
    await this.page.mouse.down();
    await this.page.mouse.move(sourceX, sourceY - 30, {steps: 8});
    await this.page.mouse.move(targetX, targetY, {steps: 30});
    await this.page.mouse.up();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Returns to the story editor from the mobile chapter editor.
   */
  async returnToStoryEditorInMobile(): Promise<void> {
    await this.clickOnElementWithJsFallback(mobileBackToStoryEditorButton);
    await this.page.waitForFunction(() => {
      const hash = (window.location.hash || '').replace(/\/+$/, '');
      return hash === '' || hash === '#';
    });
    await this.expectElementToBeVisible(storyEditorContainerSelector);
  }

  /**
   * Selects the skill with the given name and clicks on the "Done" button in
   * the Skill Selection Modal.
   * @param {string} skillName - The name of the skill to select.
   */
  async selectSkillAndClickOnDoneInSkillSelectionModal(
    skillName: string
  ): Promise<void> {
    const skillElement =
      await this.expectSkillInSkillSelectionModalToBeVisible(skillName);

    if (!skillElement) {
      throw new Error(`Skill ${skillName} not found in Skill Selection Modal`);
    }
    const radioInnerCircleSelectorElement = await skillElement.waitForSelector(
      radioInnerCircleContainerSelector
    );

    if (!radioInnerCircleSelectorElement) {
      throw new Error('Radio inner circle selector not found');
    }

    await radioInnerCircleSelectorElement.click();

    await this.clickOnElementWithSelector(confirmSkillSelectionButtonSelector);
    await this.expectElementToBeVisible(
      confirmSkillSelectionButtonSelector,
      false
    );
  }
}

export let TopicManagerFactory = (page: Page): TopicManager => {
  return new TopicManager(page);
};
