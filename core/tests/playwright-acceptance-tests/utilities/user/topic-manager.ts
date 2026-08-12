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
import {Page, ElementHandle, expect} from '@playwright/test';
import {BaseUser} from '../common/playwright-utils';
import {showMessage} from '../common/show-message';
import testConstants from '../common/test-constants';

const closeSaveModalButton = '.e2e-test-close-save-modal-button';
const saveChangesMessageInput = 'textarea.e2e-test-commit-message-input';
const topicsTab = 'a.e2e-test-topics-tab';
const desktopTopicSelector = 'a.e2e-test-topic-name';
const mobileOptionsSelector = '.e2e-test-mobile-options-base';
const mobileTopicSelector = 'div.e2e-test-mobile-topic-name a';
const saveStoryButton = 'button.e2e-test-save-story-button';
const mobileSaveStoryChangesButton =
  'div.navbar-mobile-options .e2e-test-mobile-save-story-button';
const addChapterButton = 'button.e2e-test-add-chapter-button';
const storyTitleSelector = '.e2e-test-story-title';
const chapterTitleSelector = '.e2e-test-chapter-title';
const chapterDescriptionField = '.e2e-test-add-chapter-description';
const addAcquiredSkillButton = '.e2e-test-add-acquired-skill';
const mobileCollapsibleCardHeaderSelector =
  '.oppia-mobile-collapsible-card-header';
const storyEditorContainerSelector = '.e2e-test-story-editor';
const chapterEditorContainerSelector = '.e2e-test-chapter-editor';
const skillNameInputSelector = '.e2e-test-skill-name-input';
const skillSelectionItemSelector = '.e2e-test-skill-selection-item';
const radioInnerCircleContainerSelector = '.e2e-test-radio-button';
const confirmSkillSelectionButtonSelector =
  '.e2e-test-confirm-skill-selection-button';
const skillSelectionModalSelector = '.e2e-test-skill-container';
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
const mobileChapterCollapsibleCard = '.e2e-test-mobile-add-chapter';
const mobileBackToStoryEditorButton = '.oppia-mobile-back-to-parent';
const storyEditorBreadcrumbStoryNameSelector =
  '.e2e-test-story-editor-breadcrumb-story-name';
const chapterEditorBreadcrumbStoryNameSelector =
  '.e2e-test-chapter-editor-breadcrumb-story-name';
const chapterEditorBreadcrumbChapterNameSelector =
  '.e2e-test-chapter-editor-breadcrumb-chapter-name';

export class TopicManager extends BaseUser {
  async navigateToTopicAndSkillsDashboardPage(): Promise<void> {
    await this.goto(testConstants.URLs.TopicAndSkillsDashboard);
  }

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

  async saveStoryDraft(): Promise<void> {
    if (this.isViewportAtMobileWidth()) {
      const isMobileSaveButtonVisible = await this.isElementVisible(
        mobileSaveStoryChangesButton
      );
      if (!isMobileSaveButtonVisible) {
        await this.clickOnElementWithSelector(mobileOptionsSelector);
      }
      await this.expectElementToBeVisible(mobileSaveStoryChangesButton);
      await this.clickOnElementWithSelector(mobileSaveStoryChangesButton);
    } else {
      await this.expectElementToBeVisible(saveStoryButton);
      await this.clickOnElementWithSelector(saveStoryButton);
    }
    await this.typeInInputField(
      saveChangesMessageInput,
      'Test saving story as topic manager.'
    );
    await this.page.waitForSelector(`${closeSaveModalButton}:not([disabled])`);
    await this.clickOnElementWithSelector(closeSaveModalButton);
  }

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

  async returnToStoryEditorInMobile(): Promise<void> {
    await this.clickOnElementWithJsFallback(mobileBackToStoryEditorButton);
    await this.page.waitForFunction(() => {
      const hash = (window.location.hash || '').replace(/\/+$/, '');
      return hash === '' || hash === '#';
    });
    await this.expectElementToBeVisible(storyEditorContainerSelector);
  }

  async openStoryEditor(storyName: string, topicName?: string): Promise<void> {
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
            waitUntil: 'load',
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
        `Failed to open story editor for ${storyName}: ${error}`
      );
      newError.stack = (error as Error).stack;
      throw newError;
    }
  }

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
        `Failed to open chapter editor for ${chapterName}: ${error}`
      );
      newError.stack = (error as Error).stack;
      throw newError;
    }
  }

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

  async fillSkillNameInSkillSelectionModal(skillName: string): Promise<void> {
    await this.expectElementToBeVisible(skillNameInputSelector);
    await this.typeInInputField(skillNameInputSelector, skillName);
    await this.expectElementValueToBe(skillNameInputSelector, skillName);
  }

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

  async filterAndSelectSkillInSkillSelector(skillName: string): Promise<void> {
    await this.fillSkillNameInSkillSelectionModal(skillName);
    await this.selectSkillAndClickOnDoneInSkillSelectionModal(skillName);
  }

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

  async clickReadyToPublishButton(): Promise<void> {
    if (this.isViewportAtMobileWidth()) {
      await this.page.waitForSelector(mobileSaveStoryChangesDropdown, {
        visible: true,
      });
      await this.clickOnElementWithSelector(mobileSaveStoryChangesDropdown);

      await this.expectElementToBeVisible(mobileReadyToPublishButton);
      await this.clickOnElementWithSelector(mobileReadyToPublishButton);
    } else {
      await this.page.waitForSelector(markAsReadyToPublishButton);
      await this.clickOnElementWithSelector(markAsReadyToPublishButton);

      await this.expectElementToBeVisible(markAsReadyToPublishButton, false);
    }
  }

  async readyToPublish(
    chapterName: string,
    storyName: string,
    topicName: string
  ): Promise<void> {
    await this.openStoryEditor(storyName, topicName);
    await this.waitForPageToFullyLoad();
    if (this.isViewportAtMobileWidth()) {
      await this.page.waitForSelector(mobileCollapsibleCardHeaderSelector);
      const elements = await this.page.$$(mobileCollapsibleCardHeaderSelector);
      if (elements.length < 2) {
        throw new Error('Not enough elements collapsible headers found,');
      }
      await elements[1].click();
    }
    await this.page.waitForSelector(chapterTitleSelector);
    const chapterTitles = await this.page.$$(chapterTitleSelector);

    for (const titleElement of chapterTitles) {
      const title = await this.page.evaluate(
        el => el.textContent.trim(),
        titleElement
      );

      if (title === chapterName) {
        await titleElement.click();
        await this.waitForStaticAssetsToLoad();
        await this.expectElementToBeVisible(chapterEditorContainerSelector);
        showMessage(`Chapter ${chapterName} opened in chapter editor.`);

        if (this.isViewportAtMobileWidth()) {
          await this.page.waitForSelector(mobileCollapsibleCardHeaderSelector);
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
      }
    }
    await this.typeInInputField(
      chapterDescriptionField,
      'This is a chapter description.'
    );

    await this.setNodePlannedPublicationDate();

    await this.typeInInputField(outlineEditorInput, 'This is an outline.');
    await this.clickOnElementWithSelector(saveOutlineButton);
    await this.clickOnElementWithSelector(finalizeOutlineCheckbox);
    await this.addAcquiredSkill('Place Values skills');

    await this.saveStoryDraft();
    await this.clickReadyToPublishButton();
    showMessage(`Chapter ${chapterName} marked as ready to publish.`);
  }

  async publishStoryDraftChapterUpto(dropdownValue: string): Promise<void> {
    await this.waitForPageToFullyLoad();

    if (this.isViewportAtMobileWidth()) {
      await this.page.waitForSelector(mobileCollapsibleCardHeaderSelector);
      const elements = await this.page.$$(mobileCollapsibleCardHeaderSelector);
      if (elements.length < 2) {
        throw new Error('Not enough elements collapsible headers found,');
      }
      await elements[1].click();
    }
    await this.clickOnElementWithSelector(publishUptoChaptersDropdownSelector);
    await this.select(publishUptoChaptersDropdownSelector, dropdownValue);
  }

  async expectAllListedChaptersStatus(
    chapterNames: string[],
    chapStatus: string = 'Published'
  ): Promise<void> {
    if (this.isViewportAtMobileWidth()) {
      await this.page.waitForSelector(mobileCollapsibleCardHeaderSelector);
      const elements = await this.page.$$(mobileCollapsibleCardHeaderSelector);
      if (elements.length < 2) {
        throw new Error('Not enough elements collapsible headers found,');
      }
      await elements[1].click();
    }
    await this.page.waitForSelector(storyNodeSelector);

    const rows = await this.page.$$(storyNodeSelector);
    const found = new Set<string>();

    for (const row of rows) {
      const title = await row.$eval(chapterTitleSelector, el =>
        el.textContent?.trim()
      );
      if (!title) {
        throw new Error(`${title} is Missing`);
      }
      if (chapterNames.includes(title)) {
        const status = await row.$eval(chapterStatusSelector, el =>
          el.textContent?.trim()
        );
        if (!status) {
          throw new Error(`Chapter status missing for: ${title}`);
        }
        expect(status).toBe(chapStatus);
        found.add(title);
      }
    }

    const missing = chapterNames.filter(c => !found.has(c));
    if (missing.length) {
      throw new Error(`Chapters not found: ${missing.join(', ')}`);
    }
  }

  async publishStoryDraftSerialChapter(): Promise<void> {
    if (this.isViewportAtMobileWidth()) {
      await this.clickOnElementWithSelector(mobileOptionsSelector);
      await this.page.waitForSelector(mobileSaveStoryChangesDropdown, {
        visible: true,
      });
      await this.clickOnElementWithSelector(mobileSaveStoryChangesDropdown);
      await this.page.waitForSelector(mobilePublishStoryButton);
      await this.clickOnElementWithSelector(mobilePublishStoryButton);
    } else {
      await this.waitForElementToBeClickable(publishChapterButton);
      await this.clickOnElementWithSelector(publishChapterButton);
    }
  }

  async publishChapter(
    storyName: string,
    topicName: string,
    dropdownValue: string
  ): Promise<void> {
    await this.openStoryEditor(storyName, topicName);
    await this.publishStoryDraftChapterUpto(dropdownValue);
    await this.publishStoryDraftSerialChapter();
  }
}

export let TopicManagerFactory = (page: Page): TopicManager => {
  return new TopicManager(page);
};
