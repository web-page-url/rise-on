#!/usr/bin/env node

/**
 * Rise On - Social Media Meta Tags Validator
 *
 * This script validates that all necessary meta tags for social media sharing
 * are properly configured in the application.
 *
 * Usage: node validate-meta-tags.js
 */

const fs = require('fs');
const path = require('path');

const LAYOUT_FILE = 'app/layout.tsx';
const REQUIRED_TAGS = [
  // Open Graph (Facebook, WhatsApp, LinkedIn)
  'og:title',
  'og:description',
  'og:image',
  'og:url',
  'og:type',

  // Twitter Card
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',

  // Image dimensions
  'og:image:width',
  'og:image:height',
  'og:image:type',
];

const RECOMMENDED_TAGS = [
  'og:image:secure_url',
  'og:image:alt',
  'og:site_name',
  'og:locale',
  'twitter:creator',
  'twitter:site',
];

function readLayoutFile() {
  try {
    return fs.readFileSync(LAYOUT_FILE, 'utf8');
  } catch (error) {
    console.error(`❌ Could not read ${LAYOUT_FILE}:`, error.message);
    process.exit(1);
  }
}

function validateMetaTags(content) {
  console.log('🔍 Rise On - Social Media Meta Tags Validator\n');
  console.log('=' .repeat(50));

  let passed = 0;
  let total = 0;

  // Check required tags
  console.log('\n📋 REQUIRED TAGS:');
  console.log('-'.repeat(30));

  REQUIRED_TAGS.forEach(tag => {
    total++;
    const regex = new RegExp(`property="${tag}"|name="${tag}"`, 'g');
    const matches = content.match(regex);

    if (matches && matches.length > 0) {
      console.log(`✅ ${tag} - Found ${matches.length} instance(s)`);
      passed++;
    } else {
      console.log(`❌ ${tag} - MISSING`);
    }
  });

  // Check recommended tags
  console.log('\n💡 RECOMMENDED TAGS:');
  console.log('-'.repeat(30));

  RECOMMENDED_TAGS.forEach(tag => {
    const regex = new RegExp(`property="${tag}"|name="${tag}"`, 'g');
    const matches = content.match(regex);

    if (matches && matches.length > 0) {
      console.log(`✅ ${tag} - Found ${matches.length} instance(s)`);
    } else {
      console.log(`⚠️  ${tag} - Not found (optional)`);
    }
  });

  // Check image URL
  console.log('\n🖼️  IMAGE VALIDATION:');
  console.log('-'.repeat(30));

  const imageUrlRegex = /https:\/\/rise-on\.vercel\.app\/rise-on\.png/g;
  const imageUrls = content.match(imageUrlRegex);

  if (imageUrls) {
    console.log(`✅ Image URL found: ${imageUrls[0]}`);
    console.log(`📊 Total image references: ${imageUrls.length}`);
  } else {
    console.log('❌ Image URL not found');
  }

  // Check for duplicate tags
  console.log('\n🔄 DUPLICATE CHECK:');
  console.log('-'.repeat(30));

  const duplicateChecks = ['og:image', 'og:title', 'twitter:image'];
  duplicateChecks.forEach(tag => {
    const regex = new RegExp(`property="${tag}"|name="${tag}"`, 'g');
    const matches = content.match(regex);

    if (matches && matches.length > 1) {
      console.log(`⚠️  ${tag} - Found ${matches.length} instances (may be intentional for fallbacks)`);
    } else if (matches && matches.length === 1) {
      console.log(`✅ ${tag} - Single instance`);
    } else {
      console.log(`❌ ${tag} - Not found`);
    }
  });

  // Summary
  console.log('\n📊 VALIDATION SUMMARY:');
  console.log('='.repeat(50));
  console.log(`✅ Required tags: ${passed}/${total} (${Math.round((passed/total) * 100)}%)`);
  console.log(`🎯 Status: ${passed === total ? 'PERFECT' : passed >= total * 0.8 ? 'GOOD' : 'NEEDS IMPROVEMENT'}`);

  if (passed === total) {
    console.log('\n🎉 All required meta tags are present!');
    console.log('🚀 Social media sharing should work perfectly on:');
    console.log('   • WhatsApp');
    console.log('   • Facebook');
    console.log('   • Instagram');
    console.log('   • Twitter/X');
    console.log('   • LinkedIn');
    console.log('   • Microsoft Teams');
  } else {
    console.log('\n⚠️  Some meta tags are missing. Please check the layout.tsx file.');
  }

  console.log('\n💡 Testing Tips:');
  console.log('• Deploy to Vercel first');
  console.log('• Test with: https://opengraph.xyz/url/https%3A%2F%2Frise-on.vercel.app%2F');
  console.log('• Or use: https://developers.facebook.com/tools/debug/');
}

// Main execution
console.log('🚀 Starting social media meta tags validation...\n');
const content = readLayoutFile();
validateMetaTags(content);
